import { redirect } from 'react-router-dom';
import { getToken, getUserData } from '@/utils/helpers';
import type { TUserRole } from '@/types/user.types';

export const protectedLoader = (allowedRoles?: TUserRole[]) => {
  return () => {
    const token = getToken();
    const user = getUserData();

    // Check if user is authenticated
    if (!token || !user) {
      return redirect('/login');
    }

    // Check if user has required role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard
      if (user.role === 'admin') {
        return redirect('/admin/dashboard');
      } else if (user.role === 'sender') {
        return redirect('/sender/dashboard');
      } else if (user.role === 'receiver') {
        return redirect('/receiver/dashboard');
      }
      return redirect('/');
    }

    return null;
  };
};