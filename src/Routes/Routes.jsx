import {
    createBrowserRouter,
  } from "react-router";
  
  import React from "react";
  import ReactDOM from "react-dom/client";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Login from "../pages/Shared/Login/Login";
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar></Navbar>
    },
    {
      path: '/login',
      element: <Login></Login>
    }
  ]);


