import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axiosPublic.get('/announcements');
        setAnnouncements(res.data.reverse()); // Show latest first
      } catch (error) {
        console.error('⚠️ Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className=" bg-gradient-to-b from-[#2e1a47] to-white  p-6">
      <h2 className="text-4xl font-bold text-center mb-10 text-yellow-300 font-serif drop-shadow-md">
        📜 Realm-Wide Announcements
      </h2>

      <div className="grid  gap-6 md:grid-cols-2">
        {announcements.map((a, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-indigo-800 to-purple-900 p-6 rounded-xl border-4 border-yellow-400 shadow-xl text-white font-serif hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
              ✨ {a.title}
            </h3>
            <p className="text-lg leading-relaxed">{a.description}</p>
            <div className="text-sm mt-4 text-gray-300 italic">🕰️ Posted recently</div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Announcements;
