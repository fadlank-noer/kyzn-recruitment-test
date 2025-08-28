import { useState } from 'react'
import kyznLogo from "./assets/company_logo.png"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid gap-6">
        <header className="flex items-center justify-between">
          <img src={kyznLogo} alt="KYZN Logo"></img>
          <h1 className="text-2xl md:text-3xl font-bold">Invoice Manager</h1>
        </header>

        {/* <AddInvoice onCreated={setLastCreated} />
        <InvoiceCards />
        <TimeSeries /> */}

        {/* {lastCreated && (
          <div className="text-xs text-gray-500">Terakhir dibuat: #{lastCreated.invoice_no} — {lastCreated.customer}</div>
        )} */}
      </div>
    </div>
  )
}

export default App
