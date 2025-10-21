import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { TUserRole } from '@/types/user.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: TUserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is authenticated but doesn't have permission
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has permission
  return <>{children}</>;
};

export default ProtectedRoute;