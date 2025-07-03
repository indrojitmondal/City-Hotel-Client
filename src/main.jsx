import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import 'leaflet/dist/leaflet.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import ReactDOM from "react-dom/client";
import { router } from './Routes/Routes.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
     <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
     <Toaster position='top-right' />
     </QueryClientProvider>
     </AuthProvider>
 
  </StrictMode>,
)
