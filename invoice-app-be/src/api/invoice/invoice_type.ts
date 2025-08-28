import { AddInvoiceProduct } from "@/api/invoice/invoice_validator"

interface ProductSoldData extends AddInvoiceProduct {
    id: number
    invoice_id: number
}

export interface AddInvoiceReqInterface {
    invoice_no: number
    date: string
    customer: string
    salesperson: string
    payment_type: string
    notes?: string
    products: ProductSoldData[] 
}
