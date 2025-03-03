import { baseApi } from "./baseApi";

const USERS_URL = '/users';

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => (
                {

                    url: `${USERS_URL}/login`,
                    method: 'POST',
                    body: data,
                }
        ),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});


export const { useLoginMutation, useRegisterMutation } = usersApi;