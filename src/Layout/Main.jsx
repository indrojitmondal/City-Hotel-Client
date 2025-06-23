import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';

const Main = ({children}) => {
    return (
        <div>
               <Navbar></Navbar>
               <Outlet></Outlet>
        </div>
    );
};

export default Main;