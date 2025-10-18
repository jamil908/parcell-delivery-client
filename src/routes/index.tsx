import Login from '@/Pages/auth/Login';
import Register from '@/Pages/auth/Register';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from '@/Pages/NotFound';
import Landing from '@/Pages/Landing';
import About from '@/Pages/About';
import { Tracking } from '@/Pages/Tracking';
import SenderDashboard from '@/Pages/dashboard/SenderDashboard';
import ReceiverDashboard from '@/Pages/dashboard/ReceiverDashboard';
import AdminDashboard from '@/Pages/dashboard/AdminDashboard';
// Loaders

export const router = createBrowserRouter([
  // Public Routes
 

  // Auth Routes (redirect if logged in)
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/tracking',
    element: <Tracking />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
   
  },
  {
    path: '/sender-dashboard',
    element: <SenderDashboard />,
   
  },
  {
    path: '/sender-admin',
    element: <AdminDashboard />,
   
  },
  {
    path: '/receiver-dashboard',
    element: <ReceiverDashboard />,
   
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);
