import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { FaTicketAlt } from 'react-icons/fa';

const coupons = [
  { code: 'SAVE20', discount: '20%', description: 'Save 20% on your first booking!' },
  { code: 'HOTEL10', discount: '10%', description: 'Flat 10% off on all hotel rooms.' },
  { code: 'SUMMER25', discount: '25%', description: 'Special 25% off this summer!' },
];

const CouponSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#1c102d] to-[#0E151F] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Slide direction="down" triggerOnce>
          <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide">
            🎟️ Exclusive Coupons Just for You!
          </h2>
        </Slide>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coupons.map((coupon, i) => (
            <Slide key={i} direction="up" delay={i * 100} triggerOnce>
              <div className="bg-[#2a1a44] hover:bg-[#351e57] border-l-4 border-purple-500 transition duration-300 p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <FaTicketAlt className="text-3xl text-purple-400" />
                  <p className="text-lg font-medium text-gray-200">{coupon.description}</p>
                </div>
                <div className="mt-3">
                  <span className="text-sm text-gray-400">Use Code:</span>
                  <div className="text-2xl font-bold text-purple-300 tracking-wider mt-1">{coupon.code}</div>
                  <span className="text-sm text-green-400 font-medium">{coupon.discount} OFF</span>
                </div>
              </div>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponSection;
