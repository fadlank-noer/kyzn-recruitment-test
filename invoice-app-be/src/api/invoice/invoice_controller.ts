import type { Request, Response } from "express";
import { validateAddInvoiceReq, AddInvoiceReqInterface } from "@/api/invoice/invoice_validator"
import { Invoice, ProductSold } from "@/models/index"

export async function addInvoice(req: Request, res: Response) {
    // Get Request
    const body = req.body as AddInvoiceReqInterface;

    // Validate Input
    const validate = validateAddInvoiceReq(body)
    if (!validate.is_valid) {
        res.status(400).send({
            "error": validate.errors.join(", "),
            "data": null
        })
        return
    }

    // Insert Product to DB // Total Price + 20%
    let invoice_data
    try {
        invoice_data = await Invoice.create({
            date: body.date,
            customer: body.customer,
            salesperson: body.salesperson,
            payment_type: body.payment_type,
            notes: body.notes,
    
            // Add Products
            products: body.products
        }, {
            include: [{
                model: ProductSold,
                as: "products"
            }]
        })
    } catch {
        res.status(500).send({
            "error": "internal server error!",
            "data": null
        })
        return
    }

    // Insert Success
    res.status(200).send({
        "error": null,
        "data": invoice_data
    })
}

export const getInvoices = async (req: Request, res: Response) => {
    try {
        // Get Req Query
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
    
        // DB Query
        const count = await Invoice.count()
        const rows = await Invoice.findAll({
          include: [{ model: ProductSold, as: "products" }],
          limit,
          offset,
          order: [["date", "DESC"]], // urutkan by tanggal terbaru
        });
        console.log("Countt", count)
    
        res.json({
          data: rows,
          pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.floor(count / limit),
          },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch invoices" });
    }
  };