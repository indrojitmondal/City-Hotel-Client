// components/CouponSection.jsx
import React from 'react';
import { Slide } from 'react-awesome-reveal';

const coupons = [
  { code: 'SAVE20', discount: '20%', description: 'Save 20% on your first booking!' },
  { code: 'HOTEL10', discount: '10%', description: 'Flat 10% off on all hotel rooms.' },
  { code: 'SUMMER25', discount: '25%', description: 'Special 25% off this summer!' },
];

const CouponSection = () => {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-200 py-12 px-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
     <Slide>  <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">🔥 Exclusive Coupons Just for You!</h2> </Slide>
      <div className="grid md:grid-cols-3 gap-6">
        {coupons.map((coupon, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 border-l-4 border-purple-400">
            <p className="text-lg font-semibold text-gray-800">{coupon.description}</p>
            <div className="mt-4">
              <span className="text-sm text-gray-500">Use Code:</span>
              <div className="text-xl font-bold text-purple-600 tracking-wider mt-1">{coupon.code}</div>
              <span className="text-sm text-green-600 font-medium">{coupon.discount} OFF</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponSection;
