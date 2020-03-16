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

    let formData = {
      customerName: ev.target.name.value,
      customerEmail: ev.target.email.value,
      customerAddress: ev.target.address.value,
      orderId: '',
      customerPhone: ev.target.phone.value,
      orderDetails: []
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: ev.target.email.value,
          name: ev.target.name.value
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

      formData.orderId = payload.paymentIntent.id;
      formData.orderDetails = cartContext.cartItems.map((item) => item.dishName);
      console.log(formData);
      axios.post('/api/newOrder', formData)
        .then((res) => {
          console.log("order created successfully!");
        });

    }
  };

  const renderSuccess = () => {

    //let cartDishes = cartContext.cartItems.map(item => item.dishName);

    let getCountAndTotalAmountPerDish = (original) => {
      console.log(original);

      let compressed = [];

      let copy = original.slice(0);


      for (let i = 0; i < original.length; i++) {

        let myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (let w = 0; w < copy.length; w++) {
          if (original[i] === copy[w]) {
            // increase amount of times duplicate is found
            myCount++;
            // sets item to undefined
            delete copy[w];
          }
        }

        if (myCount > 0) {
          let a = new Object();
          let sum = 0;
          a.value = original[i];
          a.count = myCount;

          cartContext.cartItems.forEach(item => {
            if (item.dishName === a.value) {
              sum = (parseFloat(sum) + parseFloat(item.dishPrice.replace('$', ''))).toFixed(2);
              a.itemPrice = parseFloat(item.dishPrice.replace('$', '')).toFixed(2);
            }
          })

          a.totalAmount = sum;

          sum = 0;

          compressed.push(a);
        }
      }
      return compressed;
    };

    //console.log(getCountAndTotalAmountPerDish(cartContext.cartItems.map(item => item.dishName)));

    const countAndTotalAmountPerDishArray = getCountAndTotalAmountPerDish(cartContext.cartItems.map(item => item.dishName));

    let getTotalAmount = () => {
      let sum = 0;
      countAndTotalAmountPerDishArray.map(item => {
        sum = (parseFloat(sum) + parseFloat(item.totalAmount)).toFixed(2);
      })

      return sum;

    }

    const totalAmount = getTotalAmount();

    return (

      <div className="container-fluid">
        <h3>We received your order!</h3>

        {/* <div className="row">
          <div className="col-xs-6 col-sm-6 col-md-6">
            <address>
              <strong>Elf Cafe</strong>
              <br />
                2135 Sunset Blvd
                      <br />
                  Los Angeles, CA 90026
                      <br />
              <abbr title="Phone">P:</abbr> (213) 484-6829
                  </address>
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 text-right">
            <p>
              <em>Date: {Date.now}</em>
            </p>
            <p>
              <em>Receipt #: 34522677W</em>
            </p>
          </div>
        </div> */}
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Item</th>
              <th>Count</th>
              <th className="text-center">Price</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {countAndTotalAmountPerDishArray.map(item => (
              <tr>
                <td className="col-md-9 font-weight-bold">{item.value}</td>
                <td className="col-md-1" style={{ textAlign: "center" }}>{item.count}</td>
                <td className="col-md-1 text-center">${item.itemPrice}</td>
                <td className="col-md-1 text-center">${item.totalAmount}</td>
              </tr>
            ))}
            <tr>
              <td>   </td>
              <td>   </td>
              <td className="text-right">
                <p>
                  <strong>Subtotal: </strong>
                </p>
                <p>
                  <strong>Tax: </strong>
                </p></td>
              <td className="text-center">
                <p>
                  <strong>${totalAmount}</strong>
                </p>
                <p>
                  <strong>${parseFloat(totalAmount * 10 / 100).toFixed(2)}</strong>
                </p></td>
            </tr>
            <tr>
              <td>   </td>
              <td>   </td>
              <td className="text-right"><h4><strong>Total: </strong></h4></td>
              <td className="text-center text-danger"><h4><strong>${(parseFloat(totalAmount) + parseFloat(totalAmount * 10 / 100)).toFixed(2)}</strong></h4></td>
            </tr>
          </tbody>
        </table>
        <div className="row">
          <div className="col-12">
            {/* <Link to="/placeOrder" className="btn btn-primary my-3 form-control">Place Another Order</Link> */}
            <button className="btn btn-primary my-3 form-control" onClick={() => {
              cartContext.emptyOutCart();
              window.location = '/';
            }}>Place Another Order</button>
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
        <h1 className="text-danger">
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
              type="email"
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
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
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
