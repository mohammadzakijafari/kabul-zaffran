// apis/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    console.log(token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const baseApi = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: () => ({}),
});

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3000' });

// export const baseApi = createApi({
//     baseQuery,
//     tagTypes: ['User'],
//     endpoints: (builder) => ({}),
// });
