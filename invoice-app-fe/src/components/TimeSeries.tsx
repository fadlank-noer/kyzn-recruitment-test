import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchInvoices, FetchInvoiceResponse, CreateInvoiceResponse } from "@/api/invoice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  Legend,
} from "recharts";
import { currency } from "../utils/currency";
import { InvoiceState } from "../store/invoice";

type Bucket = "daily" | "weekly" | "monthly";

function TimeSeries({ p_invoices }: { p_invoices: InvoiceState }) {
    // Usestate
    const [bucket, setBucket] = useState<Bucket>("daily");
    const [domain, setDomain] = useState<[number, number] | undefined>();
    const latestRef = useRef(true); // stick to end when new data arrives


    function groupByPeriod(invoices: CreateInvoiceResponse[], bucket: Bucket) {
        const map = new Map<string, number>();
        for (const inv of invoices) {
            const total = inv.products.reduce((s, p) => s + p.total_price, 0);
            const d = new Date(inv.date);
            let key = "";
            if (bucket === "daily") {
                key = d.toISOString().slice(0, 10); // YYYY-MM-DD
            } else if (bucket === "weekly") {
                // ISO week key: YYYY-Www
                const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                const dayNum = (tmp.getUTCDay() + 6) % 7; // Mon=0
                tmp.setUTCDate(tmp.getUTCDate() - dayNum + 3);
                const firstThursday = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 4));
                const week = 1 + Math.round(((tmp.getTime() - firstThursday.getTime()) / 86400000 - 3) / 7);
                key = `${tmp.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
            } else {
                key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            }
            map.set(key, (map.get(key) || 0) + total);
        }
        const rows = Array.from(map.entries())
        .map(([k, v]) => ({ period: k, revenue: v }))
        .sort((a, b) => (a.period > b.period ? 1 : -1));
        return rows;
    }

    // Transformasi invoice jadi points
    const points = useMemo(() => groupByPeriod(p_invoices.list, bucket), [p_invoices.list, bucket]);

    // Auto-scroll ke data terbaru
    useEffect(() => {
        if (!points.length) return;
        if (!domain || latestRef.current) {
        setDomain([0, Math.max(5, points.length)]);
        }
    }, [points.length, bucket]);

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Revenue</h2>
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly"] as Bucket[]).map((b) => (
            <button
              key={b}
              onClick={() => setBucket(b)}
              className={`px-3 py-1 rounded-lg border text-sm ${
                bucket === b ? "bg-purple-600 text-white" : "bg-white"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {status === "loading" && <div className="text-gray-500">Loading...</div>}

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={points.map((p, i) => ({ idx: i + 1, ...p }))}
            onMouseDown={() => (latestRef.current = false)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" interval={0} minTickGap={20} />
            <YAxis
                tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}jt`}
                domain={[0, "dataMax + 200000"]}
                interval={0}
                ticks={Array.from(
                    { length: Math.ceil((1000000 + 200000) / 200000) }, // misalnya sampai 1jt
                    (_, i) => i * 200000
                )}
            />
            <Tooltip formatter={(v: any) => currency(Number(v))} />
            <Legend />
            <Line type="monotone" dataKey="revenue" name="Revenue" dot={false} />
            <Brush
              dataKey="period"
              startIndex={domain ? domain[0] : 0}
              endIndex={domain ? domain[1] : Math.max(5, points.length)}
              onChange={(range) => {
                if (!range) return;
                setDomain([range.startIndex ?? 0, range.endIndex ?? points.length]);
                latestRef.current = (range.endIndex ?? points.length) >= points.length;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          className="px-3 py-1 rounded-lg border text-sm"
          onClick={() =>
            setDomain((d) =>
              d ? [Math.max(0, d[0] - 1), Math.max(d[0] - 1, d[1] - 1)] : undefined
            )
          }
        >
          ◀ Pan Left
        </button>
        <button
          className="px-3 py-1 rounded-lg border text-sm"
          onClick={() =>
            setDomain((d) => (d ? [d[0] + 1, d[1] + 1] : undefined))
          }
        >
          Pan Right ▶
        </button>
      </div>
    </div>
  );
}

export default TimeSeries;