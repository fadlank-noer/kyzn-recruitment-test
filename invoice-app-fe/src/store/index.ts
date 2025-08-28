import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoice";
import productReducer from "./product";

export const store = configureStore({
    reducer: {
        invoices: invoiceReducer,
        products: productReducer,
    },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;