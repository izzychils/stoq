import Link from "next/link";
import { Download, ScanBarcode, TriangleAlert } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi";
import { PageHeader } from "@/components/dashboard/page-parts";
import { InventoryTable } from "@/features/inventory/components/inventory-table";
import { products, stockStatus, totalStockValue } from "@/lib/data";
import { compactNaira, number } from "@/lib/utils";

export default function InventoryPage() {
  const low = products.filter((product) => {
    const status = stockStatus(product);
    return status === "low" || status === "critical" || status === "out";
  });
  const units = products.reduce(
    (sum, product) => sum + Object.values(product.stock).reduce((a, b) => a + b, 0),
    0,
  );

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Stock"
        title="Inventory"
        description="Every SKU with its real quantity per location. Search by name, SKU or barcode; filter by category or status."
        actions={
          <>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 text-[11.5px] font-semibold text-bone hover:border-white/20"
            >
              <Download className="size-3.5" aria-hidden />
              Export CSV
            </button>
            <button
              type="button"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-azure-500 px-3 text-[11.5px] font-bold text-white hover:bg-azure-400"
            >
              <ScanBarcode className="size-3.5" aria-hidden />
              Scan to add
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        <KpiCard label="Active SKUs" value={number(products.length)} detail="4 categories" tone="neutral" />
        <KpiCard label="Units on hand" value={number(units)} detail="all locations" />
        <KpiCard label="Stock value" value={compactNaira(totalStockValue)} detail="at cost" tone="lime" />
        <KpiCard
          label="Below reorder"
          value={`${low.length} SKUs`}
          detail="needs a decision"
          tone="amber"
          icon={<TriangleAlert className="size-3.5" aria-hidden />}
        />
      </div>

      <InventoryTable />

      <p className="text-[10px] text-fog-faint">
        Quantities and values are demonstration data.{" "}
        <Link href="/dashboard/purchase-orders" className="text-azure-300 hover:text-azure-200">
          Review draft purchase orders
        </Link>{" "}
        for the SKUs below their reorder point.
      </p>
    </div>
  );
}
