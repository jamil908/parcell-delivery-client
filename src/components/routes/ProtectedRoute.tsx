

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { TUserRole } from '@/types/user.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: TUserRole[];
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children, allowedRoles })=>  {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if role not allowed
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'sender') {
      return <Navigate to="/sender/dashboard" replace />;
    } else if (user.role === 'receiver') {
      return <Navigate to="/receiver/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute