"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Download, Search, SlidersHorizontal } from "lucide-react";
import { StatusPill } from "@/components/dashboard/kpi";
import { products, stockStatus, totalStock } from "@/lib/data";
import { cn, naira, number } from "@/lib/utils";

const CATEGORIES = ["All categories", ...Array.from(new Set(products.map((p) => p.category)))];
const STATUSES = ["All status", "healthy", "low", "critical", "out"] as const;
const LOCATION_COLUMNS = ["ikeja", "yaba", "lekki", "online"] as const;

type SortKey = "name" | "total" | "value";

export function InventoryTable() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All status");
  const [sort, setSort] = useState<SortKey>("total");
  const [descending, setDescending] = useState(true);

  const rows = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase()) ||
        product.barcode.includes(query);
      const matchesCategory = category === CATEGORIES[0] || product.category === category;
      const matchesStatus = status === "All status" || stockStatus(product) === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });

    return filtered.sort((a, b) => {
      const direction = descending ? -1 : 1;
      if (sort === "name") return a.name.localeCompare(b.name) * direction;
      if (sort === "value") return (totalStock(a) * a.cost - totalStock(b) * b.cost) * direction;
      return (totalStock(a) - totalStock(b)) * direction;
    });
  }, [query, category, status, sort, descending]);

  const toggleSort = (key: SortKey) => {
    if (key === sort) setDescending((value) => !value);
    else {
      setSort(key);
      setDescending(key !== "name");
    }
  };

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex flex-col gap-2 border-b border-white/[0.06] p-3 lg:flex-row lg:items-center">
        <label className="flex min-h-9 flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-black/25 px-2.5 text-[11px] text-fog-faint">
          <Search className="size-3.5 shrink-0" aria-hidden />
          <span className="sr-only">Search inventory</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, SKU or barcode…"
            className="min-w-0 flex-1 bg-transparent text-bone placeholder:text-fog-faint focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <label className="relative">
            <span className="sr-only">Filter by category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="min-h-9 appearance-none rounded-lg border border-white/[0.08] bg-black/25 pl-2.5 pr-7 text-[11px] text-fog focus:outline-none"
            >
              {CATEGORIES.map((option) => (
                <option key={option} value={option} className="bg-ink-900">
                  {option}
                </option>
              ))}
            </select>
            <SlidersHorizontal
              className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-fog-faint"
              aria-hidden
            />
          </label>

          <label>
            <span className="sr-only">Filter by status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as (typeof STATUSES)[number])}
              className="min-h-9 appearance-none rounded-lg border border-white/[0.08] bg-black/25 px-2.5 text-[11px] capitalize text-fog focus:outline-none"
            >
              {STATUSES.map((option) => (
                <option key={option} value={option} className="bg-ink-900">
                  {option === "All status" ? option : `${option} stock`}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 text-[11px] font-semibold text-bone hover:border-white/20"
            title="Demo export"
          >
            <Download className="size-3.5" aria-hidden />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.06] text-[8.5px] uppercase tracking-[0.1em] text-fog-faint">
              <th className="px-4 py-2.5 font-semibold">
                <button type="button" onClick={() => toggleSort("name")} className="inline-flex items-center gap-1">
                  Product
                  <ArrowUpDown className="size-2.5" aria-hidden />
                </button>
              </th>
              <th className="px-4 py-2.5 font-semibold">Category</th>
              {LOCATION_COLUMNS.map((location) => (
                <th key={location} className="px-3 py-2.5 text-right font-semibold capitalize">
                  {location === "online" ? "Online" : location}
                </th>
              ))}
              <th className="px-4 py-2.5 text-right font-semibold">
                <button type="button" onClick={() => toggleSort("total")} className="inline-flex items-center gap-1">
                  Total
                  <ArrowUpDown className="size-2.5" aria-hidden />
                </button>
              </th>
              <th className="px-4 py-2.5 text-right font-semibold">
                <button type="button" onClick={() => toggleSort("value")} className="inline-flex items-center gap-1">
                  Value
                  <ArrowUpDown className="size-2.5" aria-hidden />
                </button>
              </th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.045]">
            {rows.map((product) => {
              const total = totalStock(product);
              const status = stockStatus(product);
              return (
                <tr key={product.id} className="group hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5">
                    <p className="text-[11px] font-semibold text-bone">{product.name}</p>
                    <p className="font-mono text-[8.5px] text-fog-faint">
                      {product.sku} · {product.unit}
                    </p>
                  </td>
                  <td className="px-4 py-2.5 text-[10px] text-fog">{product.category}</td>
                  {LOCATION_COLUMNS.map((location) => (
                    <td
                      key={location}
                      className={cn(
                        "px-3 py-2.5 text-right text-[10px] tnum",
                        product.stock[location] === 0 ? "text-rose-soft" : "text-fog",
                      )}
                    >
                      {product.stock[location]}
                    </td>
                  ))}
                  <td className="px-4 py-2.5 text-right text-[10.5px] font-semibold tnum text-bone">
                    {number(total)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-[10px] tnum text-fog">
                    {naira(total * product.cost)}
                  </td>
                  <td className="px-4 py-2.5">
                    <StatusPill status={status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-1 border-t border-white/[0.06] px-4 py-2.5 text-[9.5px] text-fog-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing <span className="text-fog">{rows.length}</span> of {products.length} SKUs ·
          quantities are demo data
        </p>
        <p>Last synced 5 Nov 2026, 11:42</p>
      </div>
    </div>
  );
}
