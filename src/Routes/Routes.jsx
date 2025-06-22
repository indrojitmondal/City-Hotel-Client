import {
    createBrowserRouter,
  } from "react-router";
  
  import React from "react";
  import ReactDOM from "react-dom/client";
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: 
             <div>
              <h2 className="text-3xl text-green-400">Welcome to <span className="text-blue-500">City Hotel</span> </h2> 
              <button className="btn btn-primary">Let's Go</button>
             </div>,
    },
  ]);


