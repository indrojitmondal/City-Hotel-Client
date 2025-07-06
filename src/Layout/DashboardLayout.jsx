import React from 'react';
import Dashboard from '../pages/Dashboard/Dashboard';
import { Outlet } from 'react-router';

const DashboardLayout = ({children}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-[20%_80%] '>
             <Dashboard></Dashboard>
             <Outlet></Outlet>

        </div>
    );
};

export default DashboardLayout;