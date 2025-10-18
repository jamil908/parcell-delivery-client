

import type { TParcelStatus } from '@/types/parcel.types';
import { STATUS_COLORS, STATUS_LABELS } from './constants';

export const getStatusColor = (status: TParcelStatus): string => {
  return STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusLabel = (status: TParcelStatus): string => {
  return STATUS_LABELS[status] || status;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const generateTrackingId = (): string => {
  const prefix = 'TRK';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

export const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const setToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem('refreshToken', token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

export const setUserData = (user: any): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// export const getUserData = (): any | null => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };
export const getUserData = <T = any>(): T | null => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const removeUserData = (): void => {
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

