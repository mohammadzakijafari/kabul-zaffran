import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders/create',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
    fetchOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
  }),
});

export const { useCreateOrderMutation, useFetchOrdersQuery } = ordersApi;





// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// let token = localStorage.getItem("token");

// export const ordersApi = createApi({
//     reducerPath: "orders",
//     baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
//     endpoints: (builder) => ({
//         fetchOrders: builder.query({
//             query: () => ({
//                 url: '/orders',
//                 method: 'GET',
//                 body: {headers: { Authorization: `Bearer ${token}` }}
//             })
//         })
//     })
// });

// export const { useFetchOrdersQuery } = ordersApi;