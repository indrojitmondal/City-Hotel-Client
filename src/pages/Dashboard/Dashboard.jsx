import React from 'react';
import { Link, NavLink } from 'react-router';

const Dashboard = () => {
    return (
        <div className='border  border-[#CEA86E] min-h-screen '>
            <ul className="menu bg-base-200 rounded-box w-56">
                <li> <NavLink className={({ isActive }) => isActive ? "active text-xl" : "text-xl"} to={'/dashboard/my-profile'}>My Profile</NavLink> </li>
                <li> <NavLink className={({ isActive }) => isActive ? "active text-xl" : "text-xl"} to={'/dashboard/announcements'}>Announcements</NavLink> </li>
              
                
            </ul>
        </div>
    );
};

export default Dashboard;