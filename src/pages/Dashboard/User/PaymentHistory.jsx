import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../components/Loader/Loader';

const PaymentHistory = () => {

  const {user, loading}=useAuth();
  const axiosSecure= useAxiosSecure();
  const {data: history=[], isPending}=useQuery({
       queryKey: ['history'],
       enabled: !loading,
       queryFn: async()=>{
        const res= await axiosSecure.get(`/paymentHistory/${user.email}`);
        return res.data;
       }
  })

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 min-h-screen text-white">
      <h2 className="text-4xl font-bold text-center mb-10 fantasy-font drop-shadow-lg">
        💰 Payment History 
      </h2>
     {isPending?
      <Loader></Loader>:

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white/10 backdrop-blur-md">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="text-xs uppercase bg-black/30 text-purple-300">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item._id} className="hover:bg-purple-900/30 transition duration-300">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4">{item.transactionId}</td>
                <td className={`px-6 py-4 font-bold ${item.status === 'Completed' ? 'text-green-400' : 'text-yellow-300'}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    } 
    {/* ok */}

    </div>
  );
};

export default PaymentHistory;
