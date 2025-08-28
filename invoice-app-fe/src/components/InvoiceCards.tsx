import { useState, useEffect } from "react";
import { InvoiceState } from "@/store/invoice";
import { currency } from "../utils/currency";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { fetchInvoices } from "../api/invoice"

function InvoiceCards({ p_invoices, pages, setPage, dispatch }: { p_invoices: InvoiceState, pages: number, setPage: React.Dispatch<React.SetStateAction<number>>, dispatch: ThunkDispatch<{
    invoices: InvoiceState;
}, undefined, UnknownAction> & Dispatch<UnknownAction> }) {
    // Use State
    const [loading, setLoading] = useState(false);
  
    const load = async () => {
        if (loading || !p_invoices.hasMore) return;
        setLoading(true);

        // Response
        const new_pages = pages + 1;
        const res = await dispatch(fetchInvoices(new_pages));

        if (fetchInvoices.fulfilled.match(res)) {
            setPage(new_pages);
            setLoading(false);
        }
    };
  
    useEffect(() => {
      // initial load
      load();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <div className="bg-white rounded-2xl shadow p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Invoices</h2>
          <button
            onClick={() => {
              // reset list and reload from first page
              setPage(1);
              setTimeout(load, 0);
            }}
            className="text-sm px-3 py-1 rounded-lg border"
          >
            Refresh
          </button>
        </div>
  
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {p_invoices.list.map((inv) => {
            const total = inv.products.reduce((s, p) => s + p.total_price, 0);
            return (
              <div key={inv.invoice_no} className="rounded-2xl border p-4">
                <div className="text-sm text-gray-500">#{inv.invoice_no}</div>
                <div className="font-semibold text-lg">{inv.customer}</div>
                <div className="text-sm">Sales: {inv.salesperson}</div>
                <div className="text-sm">Pembayaran: {inv.payment_type}</div>
                <div className="mt-2 font-bold">{currency(total)}</div>
                {inv.notes && <div className="text-sm text-gray-600 mt-1">{inv.notes}</div>}
                <div className="mt-3 text-xs text-gray-400">
                  {new Date(inv.date).toLocaleString("id-ID")}
                </div>
              </div>
            );
          })}
        </div>
  
        <div className="flex justify-center mt-4">
          {p_invoices.hasMore ? (
            <button
              onClick={load}
              disabled={loading}
              className="px-4 py-2 rounded-xl border bg-gray-50 hover:bg-gray-100 disabled:opacity-60"
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          ) : (
            <div className="text-sm text-gray-500">Semua data telah dimuat.</div>
          )}
        </div>
      </div>
    );
}

export default InvoiceCards