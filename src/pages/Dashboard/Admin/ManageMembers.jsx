// components/ManageMembers.jsx
import React, { useState } from 'react';
import { FaUserAlt, FaTrash } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader/Loader';
import Swal from 'sweetalert2';

const mockMembers = [
  { id: 1, name: 'Eldrin the Wise', email: 'eldrin@fantasyrealm.com' },
  { id: 2, name: 'Seraphina Flame', email: 'seraphina@magicmail.com' },
  { id: 3, name: 'Thornblade', email: 'thornblade@darkwoods.org' },
];



const ManageMembers = () => {

    const {user, loading}= useAuth();
    const axiosSecure= useAxiosSecure();
    const { data: members=[], isPending: isMembersLoading, refetch}= useQuery({
      queryKey: [user?.email, 'members'],
      queryFn: async()=>{
        const res= await axiosSecure.get('/members')
        console.log(res.data);
        return res.data; 
     }
    })




  const handleRemove = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
         console.log('Deleted ID: ', id);
         try {
            const res = await axiosSecure.patch(`/members/${id}`);
            console.log('Patch result:', res.data); // Check here!
            refetch(); 
            Swal.fire({ title: 'Deleted!', text: 'User removed.', icon: 'success' });
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: 'Error!',
              text: error?.response?.data?.message || error.message,
              icon: 'error',
            });
          }
       
        }
      });
};

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-700 p-8 rounded-3xl shadow-2xl text-white ">
       {isMembersLoading?<Loader></Loader>:
       
      
      <>
      <h2 className="text-4xl font-bold text-center mb-10 font-serif tracking-wider">🧝‍♂️ Manage Members</h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto bg-purple-800 bg-opacity-30 rounded-xl">
          <thead className="text-white uppercase text-sm bg-purple-900 bg-opacity-50">
            <tr>
              <th className="px-6 py-4 text-left">👤 User Name</th>
              <th className="px-6 py-4 text-left">📧 Email</th>
              <th className="px-6 py-4 text-center">🗡️ Action</th>
            </tr>
          </thead>
          <tbody>
            {members?.map((member) => (
              <tr key={member._id} className="hover:bg-purple-600 hover:bg-opacity-20 transition duration-300">
                <td className="px-6 py-4 flex items-center gap-2">
                  <FaUserAlt className="text-yellow-300" />
                  <span>{member.name}</span>
                </td>
                <td className="px-6 py-4">{member.email}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleRemove(member._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300"
                  >
                    <FaTrash className="inline-block mr-1" /> Remove
                  </button>
                </td>
              </tr>
            ))}

            {members.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-8 text-xl italic text-gray-300">
                  No members in the realm 🧙‍♂️
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </>
      }
    </div>
  );
};

export default ManageMembers;
