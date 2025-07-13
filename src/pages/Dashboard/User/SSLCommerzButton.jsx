import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SSLCommerzButton = ({ orderData }) => {
   
    const axiosSecure = useAxiosSecure();
  const handlePayment = async() => {
    console.log(orderData);
    const res= await axiosSecure.post('/order', orderData);
    console.log(res.data);
    window.location.replace(res.data.url);
};

  return (
    <div className="text-center">
      <p className="mb-4 text-lg text-gray-700">You’ve chosen SSLCommerz – A Trusted Bank Gateway of Bangladesh</p>
      <button
        onClick={handlePayment}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded shadow-lg transition"
      >
        Proceed to SSLCommerz 💳
      </button>
    </div>
  );
};

export default SSLCommerzButton;