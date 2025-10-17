import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice"
import productsSlice from "./productsSlice";
import userSlice from "./userSlice";
import ordersSlice from "./ordersSlice";

// Redux Thunk is included by default in Redux Toolkit's configureStore
export const store = configureStore({
    reducer : {
        cart : cartSlice,
        products: productsSlice,
        user: userSlice,
        orders: ordersSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for Firebase Timestamp
                ignoredActions: [
                    'orders/placeOrderAsync/pending',
                    'orders/placeOrderAsync/fulfilled',
                    'orders/placeOrderAsync/rejected',
                    'orders/fetchOrdersAsync/pending',
                    'orders/fetchOrdersAsync/fulfilled',
                    'orders/fetchOrdersAsync/rejected'
                ],
                // Ignore these field paths in all actions
                ignoredActionPaths: [
                    'payload.time',
                    'payload.date',
                    'meta.arg.addressInfo.time',
                    'meta.arg.addressInfo.date'
                ],
                // Ignore these paths in the state
                ignoredPaths: ['orders.orders'],
            },
        }),
})