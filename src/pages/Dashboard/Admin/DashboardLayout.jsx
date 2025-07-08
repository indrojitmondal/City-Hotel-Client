import React from 'react';

import { Outlet } from 'react-router';
import useAdmin from '../../../hooks/useAdmin';
import AdminDashboard from './AdminDashboard';
import UserDashboard from '../User/UserDashboard';

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