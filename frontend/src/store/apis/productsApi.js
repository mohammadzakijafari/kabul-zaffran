import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            })
        })
    })
});

export const { useFetchProductsQuery } = productsApi;