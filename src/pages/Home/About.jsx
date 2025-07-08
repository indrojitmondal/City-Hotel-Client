import React from 'react';
import { FaCar, FaDollarSign, FaMousePointer, FaHeadset } from 'react-icons/fa';
import { Fade } from "react-awesome-reveal";

const About = () => {
  const points = [
    {
      icon: <FaCar className="text-4xl text-blue-400" />,
      title: "Wide Variety of Rooms",
      description: "From budget-friendly options to luxury apartments.",
    },
    {
      icon: <FaDollarSign className="text-4xl text-green-400" />,
      title: "Affordable Prices",
      description: "Competitive rates you can count on.",
    },
    {
      icon: <FaMousePointer className="text-4xl text-purple-400" />,
      title: "Easy Booking Process",
      description: "Book your room in just a few clicks.",
    },
    {
      icon: <FaHeadset className="text-4xl text-red-400" />,
      title: "Customer Support",
      description: "24/7 assistance services for all your queries.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#1c102d] to-white text-white py-16 px-6">
      <div className="max-w-7xl  mx-auto text-center">
        <Fade direction="down" triggerOnce>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-wide">
            About the Building
          </h2>
          <p className="text-lg text-gray-300 mb-14 max-w-2xl mx-auto">
            Learn more about what makes our apartment complex a top choice for modern, affordable, and convenient living.
          </p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <Fade key={index} direction="up" delay={index * 100} triggerOnce>
              <div className="bg-[#221638] hover:bg-[#2e1a47] transition-colors duration-300 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                {point.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{point.title}</h3>
                <p className="text-gray-400">{point.description}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
