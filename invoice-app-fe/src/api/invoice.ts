import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios"

export interface AddInvoiceProduct {
    item: string
    quantity: number
    total_cogs: number
    total_price: number
}

export interface ResponseAddInvoiceProduct extends AddInvoiceProduct {
    id: number
    invoice_no: number
}

export interface CreateInvoiceRequest {
    date: string
    customer: string
    salesperson: string
    payment_type: string
    notes?: string
    products: AddInvoiceProduct[] 
}

export interface CreateInvoiceResponse extends CreateInvoiceRequest {
    invoice_no: number
    products: ResponseAddInvoiceProduct[]
}

// Add Invoice
export const createInvoice = createAsyncThunk(
    "invoices/create",
    async (invoice: CreateInvoiceRequest) => {
        const res = await API.post(`/invoice`, invoice);
        return res;
    }
);

export const fetchInvoices = createAsyncThunk(
    "invoices/fetch",
    async (page: number) => {
      const res = await API.get(`/invoices?page=${page}`);
      return res.data; // pastikan API return { data: Invoice[], hasMore: boolean }
    }
);
  
