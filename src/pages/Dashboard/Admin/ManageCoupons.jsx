import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageCoupons = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  // Fetch coupons

 
  const {data: coupons=[], isPending, refetch}=useQuery({
    queryKey: ['coupons'],
    queryFn: async()=>{
        const res= await axiosSecure.get('/coupons');
        return res.data;
    }
  })


  // Submit new coupon
  const onSubmit = async(data) => {

    try {
       
       const res= await axiosSecure.post('/coupons', data);
       console.log(res.data);
       if(res.data.insertedId){
        refetch();
        reset();
       } 
    } catch (error) {
        console.log(error);
    }
    
  };

  return (
    <div className="p-6 font-fantasy">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600 drop-shadow-md">🎟️ Manage Coupons</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
        >
          ➕ Add Coupon
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-xl bg-white">
        <table className="min-w-full text-left border border-purple-300">
          <thead className="bg-purple-100 text-purple-700">
            <tr>
              <th className="py-2 px-4 border">Code</th>
              <th className="py-2 px-4 border">Discount</th>
              <th className="py-2 px-4 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={index} className="hover:bg-pink-50 transition">
                <td className="py-2 px-4 border">{coupon.code}</td>
                <td className="py-2 px-4 border">{coupon.discount}</td>
                <td className="py-2 px-4 border">{coupon.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className=" mt-5 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-2xl relative">
            <button
              onClick={() => {
                setIsOpen(false);
                reset();
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              ❌
            </button>
            <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Add New Coupon</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  {...register('code', { required: 'Coupon code is required' })}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Discount (e.g. 20%)"
                  {...register('discount', {
                    required: 'Discount is required',
                    pattern: {
                      value: /^\d{1,2}%$/,
                      message: 'Format must be like 20%',
                    },
                  })}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Coupon Description"
                  {...register('description', { required: 'Description is required' })}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-full shadow-md"
              >
                🎉 Submit Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
