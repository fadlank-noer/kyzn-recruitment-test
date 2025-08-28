import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AddInvoiceProduct {
    item: string
    quantity: string
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
        const res = await axios.post(`/api/invoice`, invoice);
        return res.data as CreateInvoiceResponse;
    }
);

export const fetchInvoices = createAsyncThunk(
    "invoices/fetch",
    async (page: number) => {
      const res = await axios.get(`/api/invoices?page=${page}`);
      return res.data; // pastikan API return { data: Invoice[], hasMore: boolean }
    }
);
  
