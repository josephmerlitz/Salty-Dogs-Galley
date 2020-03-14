import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm";
import api from "../../config/api";
import "./style.css";

const stripePromise = api.getPublicStripeKey().then(key => loadStripe(key));

//console.log(stripePromise);

export default function CheckoutFormLoader() {
  return (
    <div className="container">
      <div className="card mx-auto checkoutFormStyle">
        <div className="card-body m-5">
          <h2 className="card-title text-center mb-5">Salty Dog's Galley Checkout</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
}
