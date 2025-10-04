
import type { IApiResponse } from '@/types/api.types';
import { apiSlice } from './apiSlice';
import type { ICreateParcelPayload, IParcel, IUpdateParcelPayload } from '@/types/parcel.types';

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create parcel
    createParcel: builder.mutation<IApiResponse<IParcel>, ICreateParcelPayload>({
      query: (parcelData) => ({
        url: '/parcels',
        method: 'POST',
        body: parcelData,
      }),
      invalidatesTags: ['Parcel'],
    }),

    // Get all parcels
    getAllParcels: builder.query<IApiResponse<IParcel[]>, void>({
      query: () => '/parcels',
      providesTags: ['Parcel'],
    }),

    // Get parcel by ID
    getParcelById: builder.query<IApiResponse<IParcel>, string>({
      query: (id) => `/parcels/${id}`,
      providesTags: ['Parcel'],
    }),

    // Update parcel
    updateParcel: builder.mutation<IApiResponse<IParcel>, { id: string; payload: IUpdateParcelPayload }>({
      query: ({ id, payload }) => ({
        url: `/parcels/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Parcel'],
    }),

    // Delete parcel
    deleteParcel: builder.mutation<IApiResponse, string>({
      query: (id) => ({
        url: `/parcels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Parcel'],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useGetAllParcelsQuery,
  useGetParcelByIdQuery,
  useUpdateParcelMutation,
  useDeleteParcelMutation,
} = parcelApi;
