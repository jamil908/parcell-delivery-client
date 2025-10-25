

import ProtectedRoute from '@/components/routes/ProtectedRoute';
import PublicRoute from '@/components/routes/PublicRoute';
import About from '@/Pages/About';
import Login from '@/Pages/auth/Login';
import Register from '@/Pages/auth/Register';
import ContactPage from '@/Pages/ContactPage';
import AdminDashboard from '@/Pages/dashboard/AdminDashboard';
import ReceiverDashboard from '@/Pages/dashboard/ReceiverDashboard';
import SenderDashboard from '@/Pages/dashboard/SenderDashboard';
import Landing from '@/Pages/Landing';
import NotFound from '@/Pages/NotFound';
import { Tracking } from '@/Pages/Tracking';
import Unauthorized from '@/Pages/Unauthorized';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  // Public Routes (accessible to everyone)
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/tracking',
    element: <Tracking />,
  },

  // Auth Routes (only for non-authenticated users)
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },

  // Protected Routes - Sender Dashboard
  {
    path: '/sender-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['sender']}>
        <SenderDashboard />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Receiver Dashboard
  {
    path: '/receiver-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['receiver']}>
        <ReceiverDashboard />
      </ProtectedRoute>
    ),
  },

  // Protected Routes - Admin Dashboard
  {
    path: '/admin-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },

  // Unauthorized Page
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },

  // 404 Page
  {
    path: '*',
    element: <NotFound />,
  },
]);