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
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile";
import MakePayment from "../pages/Dashboard/MakePayment";

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
             element: <MyProfile></MyProfile>
          },
          {
            path: '/dashboard/announcements',
            element: <h2 className="p-4">Welcome to Announcement page</h2>

          },
          {
            path: '/dashboard/make-payment',
            element : <MakePayment></MakePayment>

          },
          {
            path: '/dashboard/payment-history',
            element: <h2>Payment History</h2>
          },
          {
            path: '/dashboard/checkout',
            element: <h2>Payment</h2>
          }

        ]
      }
    ]
  },


]);


