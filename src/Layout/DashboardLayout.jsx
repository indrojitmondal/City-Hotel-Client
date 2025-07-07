import React from 'react';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import { Outlet } from 'react-router';
import useAdmin from '../hooks/useAdmin';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';

const DashboardLayout = ({children}) => {
    const [isAdmin] = useAdmin();
    return (
        <div className='grid grid-cols-1 md:grid-cols-[30%_70%] '>
             {isAdmin? <AdminDashboard></AdminDashboard> : <UserDashboard></UserDashboard>}
             <Outlet></Outlet>

        </div>
    );
};

export default DashboardLayout;