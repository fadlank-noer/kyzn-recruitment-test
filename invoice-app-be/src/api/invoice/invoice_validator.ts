import { ValidatorResult } from "@/common/validator"

export interface AddInvoiceProduct {
    item: string
    quantity: string
    total_cogs: number
    total_price: number
}

export interface AddInvoiceReqInterface {
    date: string
    customer: string
    salesperson: string
    payment_type: string
    notes?: string
    products: AddInvoiceProduct[] 
}

export function validateAddInvoiceReq(data: AddInvoiceReqInterface): ValidatorResult {
    // Initialize Error Arr
    const errors: string[] = []

    // Validate Req Body
    if(!data?.date) errors.push("date is required!");
    if(!data?.customer) errors.push("customer is required!");
    if(!data?.salesperson) errors.push("salesperson is required!");
    if(!data?.payment_type) errors.push("payment_type is required!");
    
    // Validate Child
    try {
        if(!Array.isArray(data.products) || !data.products || data.products.length == 0) {
            throw new Error("Error")
        }
    } catch {
        errors.push("products is required!")
    }

    return {
        is_valid: errors.length == 0,
        errors
    }
}