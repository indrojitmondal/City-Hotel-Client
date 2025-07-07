
import React from 'react';


import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Circles } from 'react-loader-spinner';

const AdminRoute = ({children}) => {
    const {user, loading}= useAuth();
    const [isAdmin, isAdminLoading]=useAdmin();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <div className="flex justify-center items-center h-40">
        <Circles height="80" width="80" color="#facc15" ariaLabel="loading" />
    </div> 
    }
    if(user && isAdmin) return children;
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>

};

export default AdminRoute;
