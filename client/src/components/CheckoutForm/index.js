import React, { useEffect, useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./style.css";
import api from "../../config/api";
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';

export default function CheckoutForm() {

  const cartContext = useContext(CartContext)

  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {

    let sum = 0;
    cartContext.cartItems.map(element => sum = (parseFloat(sum) + parseFloat(element.dishPrice.replace('$', ''))));
    setAmount((sum + sum * 10 / 100).toFixed(2));
    setCurrency('$');

    api.createPaymentIntent({ payment_method_types: ["card"], amount: (sum + sum * 10 / 100).toFixed(2), currency: 'USD' })
      .then(clientSecret => {
        //console.log("clientSecret", clientSecret);
        setClientSecret(clientSecret);
      })
      .catch(err => {
        console.log("ERROR! ", err)
        setError(err.message);
      });
  }, []);

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: 'san antonio',
            country: 'US',
            line1: '21321 qsdsad',
            line2: 'null',
            postal_code: "78229",
            state: 'TX'
          },
          email: 'hamza.hamdan@hotmail.com',
          name: ev.target.name.value,
          phone: '2106688977'
        }
      }
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      console.log("[error]", payload.error);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
      setMetadata(payload.paymentIntent);
      console.log("[PaymentIntent]", payload.paymentIntent);
    }
  };

  const renderSuccess = () => {

    const formData = {
      customerName: 'Hamza Hamdan',
      customerEmail: 'hamza.hamdan@hotmail.com',
      customerAddress: '3333666 hhas',
      orderId: 'KJSDJASJDHKJSA',
      customerPhone: '2103333222',
      orderDetails: 'JKASHDKJSAHDKHSA'
    }

    axios.post('/api/newOrder', formData)
      .then((res) => {
        console.log(res.data);
        console.log("order created successfully!");
      })
      .catch((err) => console.log(err));






    return (
      <div>
        <h2>We received your order!</h2>

        <p>View PaymentIntent response:</p>
        <pre>
          <code>{JSON.stringify(metadata, null, 2)}</code>
        </pre>





        <div className="row">
          <div className="col-6 offset-3">
            <Link to="/placeOrder" className="btn btn-primary my-3 form-control">Place Another Order</Link>
          </div>
        </div>
      </div>
    );




  };

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <h1>
          {currency.toLocaleUpperCase()}
          {amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2
          })}{" "}
        </h1>
        <p className="lead">Fill in your card details</p>

        <div>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="off"
              className="form-control my-4" style={{ height: "50px", borderRadius: "10px" }}
            />
          </div>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              className="form-control my-4" style={{ height: "50px", borderRadius: "10px" }}
            />
          </div>
          <div>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              autoComplete="off"
              className="form-control my-4" style={{ height: "50px", borderRadius: "10px" }}
            />
          </div>

          <div>
            <CardElement className="my-4" options={options} />
          </div>
        </div >

        {error && <div>{error}</div>
        }

        <div className="row">

          <div className="col-6">
            <button className="btn btn-primary my-3 form-control" disabled={processing || !clientSecret || !stripe}>{processing ? "Processing…" : "Pay"}</button>
          </div>

          <div className="col-6">
            <Link to="/cart" className="btn btn-primary my-3 form-control">Back to Cart</Link>
          </div>

        </div>

      </form>
    );
  };

  return (
    <div>
      {succeeded ? renderSuccess() : renderForm()}
    </div>
  );
}
