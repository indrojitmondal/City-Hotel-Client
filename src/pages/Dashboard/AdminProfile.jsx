import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
// import adminImage from '../../assets/admin-wizard.png'; // fantasy wizard style image

const data = [
  { name: 'Available Rooms', value: 70 },
  { name: 'Unavailable Rooms', value: 30 },
];

const COLORS = ['#6EE7B7', '#F87171'];

const AdminProfile = () => {
    const {user}= useAuth();
    const axiosSecure = useAxiosSecure();
    const [totalRooms, setTotalRooms]= useState(0);
    const [availableRooms, setAvailableRooms]= useState(0);
    const [UnAvailableRooms, seUnAvailableRooms]=useState(0);
    const [users, setUsers]= useState(0);
    const [members, setMembers]= useState(0);
    const { data: adminStats ={}, isPending, refetch}= useQuery({
        queryKey: ['adminStats'],
      
        queryFn: async()=>{
          const res= await axiosSecure.get('/admin-stats')
          
          return res.data; 
       }
      })

      useEffect(()=>{
       
        const x=()=>{
        setTotalRooms(adminStats?.rooms);
        // Percentage of Available Rooms calculation
        const total_Rooms= adminStats?.rooms;
        const available_Rooms= adminStats?.availableRooms;
         const percentVal = (available_Rooms*100)/total_Rooms;
        const percentCal= percentVal.toFixed(2);
        setAvailableRooms(percentCal);
        // Percentage of Agreement calculation
        const total_Agreements= adminStats?.agreements;
        const percentAgreement= (total_Agreements*100)/total_Rooms;
        const percentAgreementCal= percentAgreement.toFixed(2);
        seUnAvailableRooms(percentAgreementCal);

        setUsers(adminStats?.users);
        setMembers(adminStats?.members);
        refetch();
       
        }
        x();

      },[!isPending]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white p-10 font-fantasy">
      {isPending? <Loader></Loader> : 
      <div className="max-w-5xl mx-auto rounded-2xl shadow-2xl bg-[#0f3460] p-8 border-2 border-[#e94560]">
        <h1 className="text-4xl mb-6 text-center font-bold text-[#e94560] tracking-widest">Welcome Back!</h1>

        <div className="flex items-center gap-6 mb-10">
          <img
            src={user?.photoURL}
            alt="Admin"
            className="w-32 h-32 rounded-full border-4 border-[#e94560] shadow-lg"
          />
          <div>
            <p className="text-xl font-bold text-[#fcd34d]">🧙 Admin Name: <span className="text-white">{user?.displayName}</span></p>
            <p className="text-lg mt-1">📜 Email: <span className="text-[#a5f3fc]">{user?.email}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-lg">
          <div className="bg-[#53354a] rounded-xl p-5 shadow-lg">
            🏰 Total Rooms: <span className="text-[#93c5fd] font-bold">{totalRooms}</span>
          </div>
          <div className="bg-[#374259] rounded-xl p-5 shadow-lg">
            🟢 Available Rooms: <span className="text-[#34d399] font-bold">{availableRooms}%</span>
          </div>
          <div className="bg-[#51344d] rounded-xl p-5 shadow-lg">
            🔒 Unavailable Rooms: <span className="text-[#f87171] font-bold">{UnAvailableRooms}%</span>
          </div>
          <div className="bg-[#3e2c41] rounded-xl p-5 shadow-lg">
            🧝‍♂️ Total Users: <span className="text-[#fde68a] font-bold">{users}</span>
          </div>
          <div className="bg-[#342e37] rounded-xl p-5 shadow-lg">
            🧙‍♂️ Total Members: <span className="text-[#c084fc] font-bold">{members}</span>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl mb-4 text-[#fcd34d] font-semibold text-center">Room Availability Ratio</h2>
          <div className="flex justify-center">
            <PieChart width={240} height={240}>
              <Pie
                data={data}
                cx={120}
                cy={120}
                innerRadius={50}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
             
              
              
            </PieChart>
            
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default AdminProfile;