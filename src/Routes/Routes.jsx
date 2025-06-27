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
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
        path: '/',
        element: <Home></Home>
        
        }
    ]
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/signUp',
      element: <SignUp></SignUp>
    }
  ]);


