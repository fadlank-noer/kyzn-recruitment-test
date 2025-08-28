import { useState, useEffect } from 'react'
import { CreateInvoiceResponse, fetchInvoices } from './api/invoice'
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import kyznLogo from "./assets/company_logo.png"
import './App.css'
import AddInvoice from './components/AddInvoice'
import TimeSeries from './components/TimeSeries'
import InvoiceCards from './components/InvoiceCards';

function App() {
  // Fetch Invoice
  const dispatch = useDispatch<AppDispatch>();
  const invoices = useSelector((state: RootState) => state.invoices);

  // State Management
  const [invoicePage, setInvoicePage] = useState<number>(1);
  const [lastCreated, setLastCreated] = useState<CreateInvoiceResponse | null>(null);

  // Use Effect fetch first invoice api
  useEffect(() => {
    dispatch(fetchInvoices(invoicePage))
      .unwrap()
      .then((res) => {
        console.log("✅ invoices loaded", res);
      })
      .catch((err) => {
        console.error("❌ failed to load invoices", err);
      });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid gap-6">
        <header className="flex items-center justify-between">
          <img src={kyznLogo} alt="KYZN Logo"></img>
          <h1 className="text-2xl md:text-3xl font-bold">Invoice Manager</h1>
        </header>

        <AddInvoice onCreated={setLastCreated} />
        <TimeSeries p_invoices={invoices}/>
        <InvoiceCards p_invoices={invoices} pages={invoicePage} setPage={setInvoicePage} dispatch={dispatch}/>
      </div>
    </div>
  )
}

export default App
