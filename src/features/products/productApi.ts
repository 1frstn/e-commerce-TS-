import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse} from '../../types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({

    getProducts: builder.query<ApiResponse,void>({
      query: () => 'products',
    }),
  }),
});

export const {useGetProductsQuery} = productApi