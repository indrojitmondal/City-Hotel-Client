import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const CheckoutForm = ({orderData}) => {
    const navigate = useNavigate();

    const {user} = useAuth();
    const [clientSecret, setClientSecret]= useState('');
    const [error, setError]=useState('');
    const [transactionId, setTransactionId]=useState('');
    const stripe = useStripe();

    const totalPrice = orderData?.rent;
    console.log('rent from checkout: ', orderData?.rent);
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
         axiosSecure.post('/create-payment-intent', {price: totalPrice})
         .then(res=> {
            console.log('Hello secret', res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
         })
    },[axiosSecure, totalPrice])

    const elements = useElements();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
          }
          // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

     if (card == null) {
        return;
      }
      // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }
  
      if (error) {
        console.log('[error]', error);
        setError(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        setError('');
      }
      //Confirm payment 
      
      const {paymentIntent, error: confirmError}= await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
            card: card,
            billing_details:{
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })
    if(confirmError){
        console.log('confirm error');
    }
    else{
        console.log('payment Intent',paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);
            const payment={
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(), // utc date convert. use moment js too 
                status: 'pending'
            }
           const res= await axiosSecure.post('/payments', payment); 
           if(res.data?.paymentResult?.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thank you for your payment",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/dashboard/payment-history');
        }

        }
    }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm btn-primary mt-4' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            
           <p className='text-red-500'>{error} </p>
           {transactionId && <p className='text-green-600'>Your transaction id: {transactionId} </p>}

        </form>
    );
};

export default CheckoutForm;