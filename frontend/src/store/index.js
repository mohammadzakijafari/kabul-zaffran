import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "./apis/ordersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from './apis/authApi';
import { baseApi } from "./apis/baseApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(baseApi.middleware)
        .concat(ordersApi.middleware);
    },
});

setupListeners(store.dispatch);

export { useFetchProductsQuery, useFetchProductQuery } from './apis/productsApi';
export { useFetchOrdersQuery } from './apis/ordersApi';



// ----------------- This changes are needed if I want to change my products api or users api files
// store/index.js
// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import authReducer from './apis/authApi';
// import { baseApi } from "./apis/baseApi";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [baseApi.reducerPath]: baseApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(baseApi.middleware),
// });

// setupListeners(store.dispatch);