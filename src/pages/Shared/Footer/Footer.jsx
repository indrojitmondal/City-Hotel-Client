// components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900  text-gray-200 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Website Info */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">CITY HOTEL</h2>
          <p className="text-lg text-gray-400">
            Best hotel in Dhaka and Khulna City.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Quick Links</h2>
          <ul className="space-y-1 text-xl flex flex-col">
            
             <Link to={'/'}>Home</Link>
             <Link to={'/apartment'}>Apartment</Link>
      
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Connect with Us</h2>
          <div className="flex gap-4">
            <a href="https://facebook.com/indrojitmondal" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaFacebookF size={20} />
            </a>
            <a href="https://linkedin.com/in/indrojitmondal" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://github.com/indrojitmondal" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaGithub size={20} />
            </a>
            <a href="mailto:indro.cse.bu@gmail.com" className="hover:text-white">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-lg text-gray-500">
        © {new Date().getFullYear()} Indrojit Mondal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
