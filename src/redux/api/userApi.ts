
import type { IApiResponse } from '@/types/api.types';
import { apiSlice } from './apiSlice';
import type { IUpdateBlockStatusPayload, IUpdateRolePayload, IUser } from '@/types/user.types';
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user
    getMe: builder.query<IApiResponse<IUser>, void>({
      query: () => '/users/me',
      providesTags: ['Auth'],
    }),

    // Get all users (Admin only)
    getAllUsers: builder.query<IApiResponse<IUser[]>, void>({
      query: () => '/users',
      providesTags: ['User'],
    }),

    // Update user role (Admin only)
    updateUserRole: builder.mutation<IApiResponse<IUser>, { id: string; payload: IUpdateRolePayload }>({
      query: ({ id, payload }) => ({
        url: `/users/update-role/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    // Block/Unblock user (Admin only)
    updateUserBlockStatus: builder.mutation<IApiResponse<IUser>, { id: string; payload: IUpdateBlockStatusPayload }>({
      query: ({ id, payload }) => ({
        url: `/users/block/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    // Delete user (Admin only)
    deleteUser: builder.mutation<IApiResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserBlockStatusMutation,
  useDeleteUserMutation,
} = userApi;
