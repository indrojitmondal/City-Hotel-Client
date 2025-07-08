import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const announcement={
        title: data.title,
        description: data.description
    }
    console.log(announcement);
    try {
      await axiosSecure.post('/announcements',  announcement);
     
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Announcement has been sent",
        showConfirmButton: false,
        timer: 1500
      });
      
      reset();
    } catch (err) {
      console.error(err);
      
      Swal.fire({
        title: "Error!",
        text: "Failed to post announcement",
        icon: "error"
      });
    }
  };

  return (
    <div className="  p-8 rounded-2xl bg-gradient-to-br from-purple-800 to-indigo-900 shadow-2xl text-white font-serif border-4 border-yellow-400">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-300">📣 Royal Announcement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-2 text-lg text-yellow-200">🪄 Title</label>
          <input
            {...register('title', { required: true })}
            className="w-full px-4 py-2 rounded bg-white text-gray-900 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="The Grand Feast Begins"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg text-yellow-200">📜 Description</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full px-4 py-2 rounded bg-white text-gray-900 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows="4"
            placeholder="Let the realm know what’s brewing..."
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
        >
          ✨ Send Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
