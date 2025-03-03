import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let token = localStorage.getItem("token");

export const ordersApi = createApi({
    reducerPath: "orders",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    endpoints: (builder) => ({
        fetchOrders: builder.query({
            query: () => ({
                url: '/orders',
                method: 'GET',
                body: {headers: { Authorization: `Bearer ${token}` }}
            })
        })
    })
});

export const { useFetchOrdersQuery } = ordersApi;