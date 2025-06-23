import React from 'react';
import { FaCar, FaDollarSign, FaMousePointer, FaHeadset } from 'react-icons/fa';
import { Fade, Slide } from "react-awesome-reveal";

const About = () => {
  const points = [
    {
      icon: <FaCar className="text-4xl text-blue-500" />,
      title: "Wide Variety of Rooms",
      description: "From budget-friendly options to luxury vehicles.",
    },
    {
      icon: <FaDollarSign className="text-4xl text-green-500" />,
      title: "Affordable Prices",
      description: "Competitive daily rates you can count on.",
    },
    {
      icon: <FaMousePointer className="text-4xl text-purple-500" />,
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks.",
    },
    {
      icon: <FaHeadset className="text-4xl text-red-500" />,
      title: "Customer Support",
      description: "24/7 assistance for all your queries.",
    },
  ];

  return (
    <section className="bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto text-center">
     
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About the Building</h2>
       
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg"
            >
              <div>{point.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mt-4">
                {point.title}
              </h3>
              <p className="text-gray-600 mt-2">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;