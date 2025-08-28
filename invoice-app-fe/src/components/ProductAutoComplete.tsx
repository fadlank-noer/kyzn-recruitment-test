import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { AddInvoiceProduct } from "../api/invoice";
import { currency } from "../utils/currency";
import { ProductCatalogItem } from "@/api/product";

interface Props {
    product: AddInvoiceProduct[];
    setProduct: React.Dispatch<React.SetStateAction<AddInvoiceProduct[]>>;
}

export default function ProductAutocomplete({ product, setProduct }: Props) {
  const [query, setQuery] = useState("");
  const products = useSelector((state: RootState) => state.products.list);

  // Filter produk sesuai query
  const filteredProducts = useMemo(() => {
    if (!query) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, products]);

  // Tambah produk ke list
  function handleClick(p: ProductCatalogItem) {
    const existing = product.find((prod) => prod.item === p.name);

    if (existing) {
      // kalau sudah ada, tambah quantity
      handleQuantityChange(p.name, existing.quantity + 1);
    } else {
      const data: AddInvoiceProduct = {
        item: p.name,
        quantity: 1,
        total_cogs: p.price,
        total_price: p.price + p.price * 0.2,
      };
      setProduct((prev) => [...prev, data]);
    }

    setQuery("");
  }

  // Ubah qty + total price
  function handleQuantityChange(name: string, qty: number) {
    setProduct((prev) => {
        const local_store: AddInvoiceProduct[] = []
        prev.map((prod) => {
            // Check Name
            if (prod.item === name) {
                if (qty > 0) {
                    const _qty = (qty > 0 ? qty : 1);
                    local_store.push({
                        ...prod,
                        quantity: _qty,
                        total_price: (prod.total_cogs * _qty) + (prod.total_cogs * _qty * 20 / 100),
                    })
                }
            } else {
                if (qty > 0) {
                    local_store.push(prod)
                }
            }
        })

        return local_store
    })
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">Products *</label>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari produk..."
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Autocomplete dropdown */}
      {filteredProducts.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-scroll">
          {filteredProducts.map((p) => (
            <button
              type="button"
              key={p.id}
              onClick={() => handleClick(p)}
              className="w-full text-left p-2 hover:bg-gray-50 flex gap-3"
            >
              <img
                src={p.picture}
                alt={p.name}
                className="w-10 h-10 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">{currency(p.price)}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* List produk terpilih */}
      <div className="mt-4 space-y-2">
        {product.map((p) => (
          <div
            key={p.item}
            className="flex items-center justify-between border rounded-lg p-2 shadow-sm"
          >
            <div>
              <div className="font-medium">{p.item}</div>
              <div className="text-xs text-gray-500">{currency(p.total_price)} (x{p.quantity})</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuantityChange(p.item, p.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{p.quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(p.item, p.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
