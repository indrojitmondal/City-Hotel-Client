import React from 'react';
import 'leaflet/dist/leaflet.css';
import img1 from '../../components/Banner/images/2.jpg';

const LocationSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#1c102d] to-white text-white py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <h2 className="text-4xl font-extrabold text-center mb-14 tracking-wide">
        📍 Our Location
      </h2>

      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 30, 0.85), rgba(10, 10, 30, 0.85)), url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Location Info */}
            <div className="space-y-5 text-white">
              <h3 className="text-2xl font-semibold">Where to Find Us</h3>
              <p className="text-gray-300">
                Our apartment is located in the heart of Dhaka, just a 5-minute walk from Bashundhara City Mall.
                You can reach us via Mirpur Road, near the New Market area.
              </p>
              <ul className="list-disc list-inside text-gray-400 leading-relaxed">
                <li><strong>Address:</strong> House #12, Road #7, Dhanmondi, Dhaka-1205</li>
                <li><strong>Landmark:</strong> Opposite to City College</li>
                <li><strong>Phone:</strong> +880 1234 567890</li>
              </ul>
              <p className="text-sm italic text-gray-400">
                Use Google Maps or Uber to easily find us!
              </p>
            </div>

            {/* Google Map */}
            <div className="w-full h-72 sm:h-96 md:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.4968704439325!2d89.54849740949037!3d22.821099679229288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff918e9c716897%3A0x706b6e76a7793626!2sCity%20Inn%20Limited!5e0!3m2!1sen!2sbd!4v1750685538437!5m2!1sen!2sbd"
                className="w-full h-full rounded-xl border-none shadow-lg"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Apartment Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
