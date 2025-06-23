import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';

const Main = ({children}) => {
    return (
        <div>
               <Navbar></Navbar>
               <Outlet></Outlet>
               <Footer></Footer>
        </div>
    );
};

export default Main;