import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddInvoiceProduct, CreateInvoiceResponse, fetchInvoices, createInvoice } from "../api/invoice"

interface InvoiceState {
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
  reducers: {
    addInvoiceLocal: (state, action: PayloadAction<CreateInvoiceResponse>) => {
      state.list.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
    //   .addCase(fetchInvoices.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(fetchInvoices.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.list = [...state.list, ...action.payload.data];
    //     state.hasMore = action.payload.hasMore;
    //     state.page += 1;
    //   })
    //   .addCase(fetchInvoices.rejected, (state) => {
    //     state.status = "failed";
    //   })

    // POST
    .addCase(createInvoice.fulfilled, (state, action) => {
        state.list.unshift(action.payload.data.data);
    });
  },
});

export const { addInvoiceLocal } = invoiceSlice.actions;
export default invoiceSlice.reducer;
