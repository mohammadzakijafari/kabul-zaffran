import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./apis/productsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(productsApi.middleware);
    }
});

setupListeners(store.dispatch);

export { useFetchProductsQuery, useFetchProductQuery } from './apis/productsApi';