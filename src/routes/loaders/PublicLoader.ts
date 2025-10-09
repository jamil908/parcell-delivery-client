import { redirect } from 'react-router-dom';
import { getToken, getUserData } from '@/utils/helpers';

export const publicLoader = () => {
  const token = getToken();
  const user = getUserData();

  // If user is authenticated, redirect to dashboard
  if (token && user) {
    if (user.role === 'admin') {
      return redirect('/admin/dashboard');
    } else if (user.role === 'sender') {
      return redirect('/');
    } else if (user.role === 'receiver') {
      return redirect('/receiver/dashboard');
    }
  }

  return null;
};