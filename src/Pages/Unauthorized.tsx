import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/admin-dashboard';
      case 'sender':
        return '/sender-dashboard';
      case 'receiver':
        return '/receiver-dashboard';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <ShieldAlert className="w-24 h-24 text-red-600 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">403</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-lg text-gray-600 mb-2">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500">
            {user ? `Your role: ${user.role}` : 'Please login to continue'}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>

          <Link
            to={getDashboardLink()}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <Home className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </Link>

          <Link
            to="/"
            className="block text-gray-600 hover:text-gray-900 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;