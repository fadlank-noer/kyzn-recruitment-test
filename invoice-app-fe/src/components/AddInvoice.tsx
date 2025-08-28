import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { CreateInvoiceResponse, CreateInvoiceRequest, AddInvoiceProduct, createInvoice } from "../api/invoice"
import ProductAutocomplete from "./ProductAutoComplete"
import { AnimatePresence, motion } from "framer-motion";

enum PaymentType {
    CASH="CASH",
    CREDIT="CREDIT",
    NOTCASHORCREDIT="NOTCASHORCREDIT"
}

// Add Invoice
export default function AddInvoice({ onCreated }: { onCreated: (inv: CreateInvoiceResponse) => void }) {
    // Get Dispatch
    const dispatch = useDispatch<AppDispatch>();
    
    // Set Initial Invoice
    const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 16)); // datetime-local
    const [customer, setCustomer] = useState("");
    const [salesperson, setSalesperson] = useState("");
    const [payment, setPayment] = useState<PaymentType>(PaymentType.CASH);
    const [notes, setNotes] = useState("");
    const [localProducts, setLocalProducts] = useState<AddInvoiceProduct[]>([]);

    // Set Notif
    const [toast, setToast] = useState<string>("");
    const [errorToast, setErrorToast] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const submitting = useRef(false);

    // Toast 
    function Toast({ message, onClose, bg }: { message: string; onClose: () => void; bg: string }) {
        useEffect(() => {
          const t = setTimeout(onClose, 2500);
          return () => clearTimeout(t);
        }, [onClose]);
        return (
          <AnimatePresence>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`fixed top-6 right-6 text-white px-4 py-3 rounded-2xl shadow-xl ${bg == "red" ? "bg-red-600" : "bg-green-600"}`}
            >
              {message}
            </motion.div>
          </AnimatePresence>
        );
    }
  
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (submitting.current) return;
  
        // Generate Payload
        const payload: CreateInvoiceRequest = {
            date: new Date(date).toISOString(),
            customer,
            salesperson,
            payment_type: payment,
            notes: notes || undefined,
            products: localProducts,
        };

        // Validate Products
        if (payload.products.length < 1) {
            setErrorToast("products tidak boleh kosong!")
        }
  
        submitting.current = true;

        try {
            const res = await dispatch(createInvoice(payload));

            // Dispatch
            if (createInvoice.fulfilled.match(res)) {
                if(res.payload.status == 200) {
                    setToast("Invoice berhasil disimpan");
                    console.log("Testtt\n", res.payload.data.data)
                    onCreated(res.payload.data.data);

                    // Clear Form
                    setDate(() => new Date().toISOString().slice(0, 16))
                    setCustomer("");
                    setSalesperson("");
                    setNotes("");
                    setLocalProducts([]);
                }
            }
            setOpenModal(!openModal)
        } catch (err) {
            setToast("Gagal menyimpan invoice");
            console.error(err);
        } finally {
            submitting.current = false;
        }
    }
  
    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <h2 className="text-xl">Welcome Back</h2>
                <button onClick={()=> setOpenModal(!openModal)} className="bg-blue-700 rounded-md w-35 h-8 hover:cursor-pointer hover:border-3 hover:border-red-700">+ Add Invoice</button>
            </div>

            {/* Add Invoice */}
            <div className={`fixed inset-0 flex items-center justify-center bg-black/75 z-50 ${openModal ? "" : "hidden"}`}>
                <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Add Invoice</h2>

                    <form onSubmit={handleSubmit} className="space-y-3 overflow-scroll">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date *</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Customer Name *
                            </label>
                            <input
                                type="text"
                                value={customer}
                                onChange={(e) => setCustomer(e.target.value)}
                                className="w-full border rounded p-2"
                                placeholder="Enter customer name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Salesperson Name *
                            </label>
                            <input
                                type="text"
                                value={salesperson}
                                onChange={(e) => setSalesperson(e.target.value)}
                                className="w-full border rounded p-2"
                                placeholder="Enter salesperson name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Payment Type *</label>
                            <select
                                value={payment}
                                onChange={(e) => setPayment(e.target.value as PaymentType)}
                                className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 border`}
                            >
                                <option value="CASH">CASH</option>
                                <option value="CREDIT">CREDIT</option>
                                <option value="NOTCASHORCREDIT">NOTCASHORCREDIT</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Notes</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full border rounded p-2"
                                placeholder="Additional notes"
                            />
                        </div>
                        
                        <ProductAutocomplete product={localProducts} setProduct={setLocalProducts}/>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setOpenModal(!openModal)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Save Invoice
                            </button>
                        </div>
                    </form>

                </div>
            </div>

            {toast && <Toast message={toast} onClose={() => setToast("")} bg="green" />}
            {errorToast && <Toast message={errorToast} onClose={() => setErrorToast("")} bg="red" />}
        </>
    );
}