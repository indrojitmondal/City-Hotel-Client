import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import SSLCommerzButton from './SSLCommerzButton'; // <-- You create this component

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CheckOut = () => {
  const location = useLocation();
  const orderData = location.state;

  const [method, setMethod] = useState('stripe');

  return (
    <div className=" my-10 px-6 py-8 rounded-lg shadow-xl bg-gradient-to-br from-indigo-50 to-pink-50">
      <h2 className="text-4xl text-center font-extrabold text-violet-600 mb-6">💸 Choose Your Payment Portal</h2>

      {/* Method Selector */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMethod('stripe')}
          className={`px-5 py-2 font-semibold rounded-md border-2 ${
            method === 'stripe'
              ? 'bg-violet-500 text-white border-violet-600'
              : 'bg-white text-violet-600 border-violet-400'
          } hover:scale-105 transition`}
        >
          🧾 Pay with Stripe
        </button>

        <button
          onClick={() => setMethod('sslcommerz')}
          className={`px-5 py-2 font-semibold rounded-md border-2 ${
            method === 'sslcommerz'
              ? 'bg-pink-500 text-white border-pink-600'
              : 'bg-white text-pink-600 border-pink-400'
          } hover:scale-105 transition`}
        >
          🏦 Pay with SSLCommerz
        </button>
      </div>

      {/* Render Based on Method */}
      <div className="bg-white p-6 rounded-md shadow-md">
        {method === 'stripe' ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm orderData={orderData} />
          </Elements>
        ) : (
          <SSLCommerzButton orderData={orderData} />
        )}
      </div>
    </div>
  );
};

export default CheckOut;