import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { Circles } from 'react-loader-spinner';


const PrivateRoute = ({children}) => {
    const {user, loading}= useAuth();
    const location = useLocation();
    if(loading){
        return <div className="flex justify-center items-center h-40">
        <Circles height="80" width="80" color="#facc15" ariaLabel="loading" />
    </div> 
    }
    if(user) return children;
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>

};

export default PrivateRoute;