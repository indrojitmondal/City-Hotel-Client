import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLocation } from 'react-router';
import CheckoutForm from './CheckoutForm';

const CheckOut = () => {
    const location = useLocation();
    const orderData= location.state;
    console.log(location.state);
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    console.log(stripePromise);
    return (
        <div>
            <h2 className='text-4xl text-center font-bold text-amber-400'>Payment</h2>
            <div className='px-5 mt-5'>
                <Elements  stripe={stripePromise}>
                  
                    <CheckoutForm orderData={orderData}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default CheckOut;