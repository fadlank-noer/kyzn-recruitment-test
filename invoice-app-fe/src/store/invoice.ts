import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ProductSold {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Invoice {
  id?: number;
  date: string;
  customer: string;
  salesperson: string;
  notes?: string;
  products: ProductSold[];
  total: number;
}

interface InvoiceState {
  list: Invoice[];
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
    addInvoiceLocal: (state, action: PayloadAction<Invoice>) => {
      state.list.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = [...state.list, ...action.payload.data];
        state.hasMore = action.payload.hasMore;
        state.page += 1;
      })
      .addCase(fetchInvoices.rejected, (state) => {
        state.status = "failed";
      })
      // POST
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.list.unshift(action.payload); // langsung masuk ke list
      });
  },
});

export const { addInvoiceLocal } = invoiceSlice.actions;
export default invoiceSlice.reducer;
