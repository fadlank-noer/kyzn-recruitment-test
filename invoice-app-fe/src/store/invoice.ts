import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddInvoiceProduct, CreateInvoiceResponse, fetchInvoices, createInvoice } from "../api/invoice"

export interface InvoiceState {
  list: CreateInvoiceResponse[];
  status: "idle" | "loading" | "failed";
  page: number;
  hasMore: boolean;
}

const initialState: InvoiceState = {
  list: [],
  status: "idle",
  page: 1,
  hasMore: true,
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // GET
    .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
    })
    .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = [...state.list, ...action.payload.data];
        state.hasMore = action.payload.pagination.totalPages < action.payload.pagination.page;
        state.page += 1;
    })

    // POST
    .addCase(createInvoice.fulfilled, (state, action) => {
        state.list.unshift(action.payload.data.data);
    });
  },
});

export default invoiceSlice.reducer;
