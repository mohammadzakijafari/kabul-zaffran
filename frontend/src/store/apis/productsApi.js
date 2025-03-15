import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => '/products',
      providesTags: ['Product']
    }),
    fetchProduct: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: ['Product']
    })
  })
});

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const productsApi = createApi({
//     reducerPath: 'products',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
//     endpoints: (builder) => ({
//         fetchProducts: builder.query({
//             query: () => ({
//                 url: '/products',
//                 method: 'GET',
//             })
//         }),
//         fetchProduct: builder.query({
//             query: (productId) => ({
//                 url: `/products/${productId}`,
//                 method: 'GET',
//             })
//         })
//     })
// });

export const { useFetchProductsQuery, useFetchProductQuery } = productsApi;