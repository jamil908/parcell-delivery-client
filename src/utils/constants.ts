
export const USER_ROLES = {
  ADMIN: 'admin',
  SENDER: 'sender',
  RECEIVER: 'receiver',
  CUSTOMER: 'customer',
} as const;

export const PARCEL_STATUS = {
  PENDING: 'pending',
  PICKED: 'picked',
  IN_TRANSIT: 'in-transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  picked: 'bg-blue-100 text-blue-800',
  'in-transit': 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
} as const;

export const STATUS_LABELS = {
  pending: 'Pending',
  picked: 'Picked',
  'in-transit': 'In Transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
} as const;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  
  // Users
  USERS: '/users',
  ME: '/users/me',
  UPDATE_ROLE: (id: string) => `/users/update-role/${id}`,
  BLOCK_USER: (id: string) => `/users/block/${id}`,
  DELETE_USER: (id: string) => `/users/${id}`,
  
  // Parcels
  PARCELS: '/parcels',
  PARCEL_BY_ID: (id: string) => `/parcels/${id}`,
} as const;

