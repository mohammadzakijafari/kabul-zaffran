import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./apis/productsApi";
import { ordersApi } from "./apis/ordersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './apis/authApi';
import { baseApi } from "./apis/baseApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(baseApi.middleware)
        .concat(productsApi.middleware)
        .concat(ordersApi.middleware);
    },
});

setupListeners(store.dispatch);

export { useFetchProductsQuery, useFetchProductQuery } from './apis/productsApi';
export { useFetchOrdersQuery } from './apis/ordersApi';