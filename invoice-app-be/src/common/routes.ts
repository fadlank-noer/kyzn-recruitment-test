import express, { type Router } from "express";
import { addInvoice, getInvoices } from "@/api/invoice/invoice_controller"

// Define Router
export const router: Router = express.Router();

// Invoice Route
router.post("/invoice", addInvoice)
router.get("/invoices", getInvoices)

export default router
