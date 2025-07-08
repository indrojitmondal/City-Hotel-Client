import {
  createBrowserRouter,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Login from "../pages/Shared/Login/Login";

import Main from "../Layout/Main";
import Banner from "../components/Banner/Banner";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Shared/Register/signUp";
import Apartment from "../pages/Apartment/Apartment";
import Dashboard from "../pages/Dashboard/User/UserDashboard";
import DashboardLayout from "../pages/Dashboard/Admin/DashboardLayout";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import MakePayment from "../pages/Dashboard/User/MakePayment";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import Announcements from "../pages/Dashboard/User/Announcements";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import CheckOut from "../pages/Dashboard/User/CheckOut";
import ManageMembers from "../pages/Dashboard/Admin/ManageMembers";
import AgreementRequests from "../pages/Dashboard/Admin/AgreementRequests";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>

      },
      {
        path: '/apartment',
        element: <Apartment></Apartment>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
          {
             path: '/dashboard/my-profile',
             
             element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
          },
          {
            path: '/dashboard/admin-profile',
            element: <AdminRoute> <AdminProfile></AdminProfile> </AdminRoute>
          },
          
          {
            path: '/dashboard/manage-members',
            element: <AdminRoute> <ManageMembers></ManageMembers> </AdminRoute>
          },
          {
            path: '/dashboard/agreement-requests',
            element: <AdminRoute> <AgreementRequests></AgreementRequests> </AdminRoute>
          },
          {
            path: '/dashboard/make-announcements',
            element: <AdminRoute> <MakeAnnouncement></MakeAnnouncement> </AdminRoute>
          },
          {
            path: '/dashboard/manage-coupons',
            element: <AdminRoute> <ManageCoupons></ManageCoupons> </AdminRoute>
          },
          
          {
            path: '/dashboard/announcements',
            element: <PrivateRoute><Announcements></Announcements></PrivateRoute>

          },
          {
            path: '/dashboard/make-payment',
            element : <PrivateRoute><MakePayment></MakePayment></PrivateRoute>

          },
          {
            path: '/dashboard/payment-history',
            element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
          },
          {
            path: '/dashboard/checkout',
            element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>
          }

        ]
      }
    ]
  },


]);


