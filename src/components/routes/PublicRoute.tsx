

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    // Redirect authenticated users to their dashboard
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'sender') {
      return <Navigate to="/" replace />;
    } else if (user.role === 'receiver') {
      return <Navigate to="/receiver/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default PublicRoute;