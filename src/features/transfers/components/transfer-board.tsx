"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Plus, Search } from "lucide-react";
import { locations, transfers, type Transfer } from "@/lib/data";
import { cn, shortDate } from "@/lib/utils";

const COLUMNS: { id: Transfer["status"]; label: string; hint: string }[] = [
  { id: "draft", label: "Draft", hint: "Awaiting approval" },
  { id: "in-transit", label: "In transit", hint: "Left the sender" },
  { id: "received", label: "Received", hint: "Signed at destination" },
];

const locationName = (id: Transfer["from"]) =>
  locations.find((location) => location.id === id)?.name ?? id;

export function TransferBoard() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Transfer | null>(null);
  const [confirmed, setConfirmed] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      transfers.filter((transfer) => {
        if (!query) return true;
        const haystack = `${transfer.id} ${transfer.note} ${locationName(transfer.from)} ${locationName(transfer.to)}`;
        return haystack.toLowerCase().includes(query.toLowerCase());
      }),
    [query],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex min-h-9 flex-1 items-center gap-2 rounded-lg border border-white/[0.08] bg-black/25 px-2.5 text-[11px] text-fog-faint sm:max-w-sm">
          <Search className="size-3.5 shrink-0" aria-hidden />
          <span className="sr-only">Search transfers</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by ID, route or note…"
            className="min-w-0 flex-1 bg-transparent text-bone placeholder:text-fog-faint focus:outline-none"
          />
        </label>
        <button
          type="button"
          onClick={() => setSelected(transfers[0])}
          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-azure-500 px-3 text-[11.5px] font-bold text-white hover:bg-azure-400"
        >
          <Plus className="size-3.5" aria-hidden />
          Draft transfer
        </button>
      </div>

      <div className="grid gap-2.5 lg:grid-cols-3">
        {COLUMNS.map((column) => {
          const items = filtered.filter((transfer) => transfer.status === column.id);
          return (
            <section key={column.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-2.5">
              <header className="flex items-center justify-between px-1 py-1.5">
                <div>
                  <h2 className="text-[11.5px] font-semibold text-bone">{column.label}</h2>
                  <p className="text-[9px] text-fog-faint">{column.hint}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] tnum text-fog">
                  {items.length}
                </span>
              </header>

              <div className="mt-1 space-y-2">
                {items.length ? (
                  items.map((transfer) => {
                    const isConfirmed = confirmed.includes(transfer.id);
                    return (
                      <article
                        key={transfer.id}
                        className="rounded-xl border border-white/[0.07] bg-ink-900/60 p-3 transition-colors hover:border-azure-500/25"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[9.5px] text-azure-300">{transfer.id}</p>
                          <span className="text-[9px] text-fog-faint">{shortDate(transfer.created)}</span>
                        </div>
                        <p className="mt-1.5 flex items-center gap-1 text-[10px] text-fog">
                          {locationName(transfer.from)}
                          <ArrowRight className="size-2.5 shrink-0 text-fog-faint" aria-hidden />
                          {locationName(transfer.to)}
                        </p>
                        <p className="mt-1 text-[10px] text-bone">
                          {transfer.items} lines · <span className="tnum">{transfer.units}</span> units
                        </p>
                        <p className="mt-1 truncate text-[9px] text-fog-faint">{transfer.note}</p>

                        {transfer.status === "draft" ? (
                          <button
                            type="button"
                            onClick={() => setSelected(transfer)}
                            className="mt-2.5 inline-flex min-h-7 w-full items-center justify-center rounded-lg border border-azure-500/25 bg-azure-500/10 text-[9.5px] font-semibold text-azure-300 hover:bg-azure-500/15"
                          >
                            Review draft
                          </button>
                        ) : null}

                        {transfer.status === "in-transit" ? (
                          <button
                            type="button"
                            onClick={() =>
                              setConfirmed((current) =>
                                current.includes(transfer.id)
                                  ? current
                                  : [...current, transfer.id],
                              )
                            }
                            disabled={isConfirmed}
                            className={cn(
                              "mt-2.5 inline-flex min-h-7 w-full items-center justify-center rounded-lg border text-[9.5px] font-semibold transition-colors",
                              isConfirmed
                                ? "border-lime-400/25 bg-lime-400/10 text-lime-300"
                                : "border-white/10 bg-white/[0.03] text-fog hover:text-bone",
                            )}
                          >
                            {isConfirmed ? "Receipt recorded (demo)" : "Confirm receipt"}
                          </button>
                        ) : null}

                        {transfer.status === "received" ? (
                          <p className="mt-2.5 inline-flex min-h-7 w-full items-center justify-center rounded-lg border border-lime-400/20 bg-lime-400/[0.06] text-[9.5px] font-semibold text-lime-300/80">
                            Closed
                          </p>
                        ) : null}
                      </article>
                    );
                  })
                ) : (
                  <p className="px-1 py-6 text-center text-[10px] text-fog-faint">
                    Nothing in this column.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center">
          <button
            type="button"
            aria-label="Close transfer dialog"
            onClick={() => setSelected(null)}
            className="absolute inset-0 cursor-default"
          />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-ink-900 p-5 shadow-2xl">
            <p className="text-[9px] uppercase tracking-[0.14em] text-fog-faint">Transfer draft</p>
            <h2 className="mt-1 text-[16px] font-semibold text-bone">{selected.id}</h2>
            <p className="mt-1 text-[11px] text-fog">
              {locationName(selected.from)} → {locationName(selected.to)}
            </p>

            <div className="mt-4 space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
              <div className="flex justify-between text-[10.5px]">
                <span className="text-fog-faint">Lines</span>
                <span className="text-bone">{selected.items}</span>
              </div>
              <div className="flex justify-between text-[10.5px]">
                <span className="text-fog-faint">Units</span>
                <span className="tnum text-bone">{selected.units}</span>
              </div>
              <div className="flex justify-between text-[10.5px]">
                <span className="text-fog-faint">Created</span>
                <span className="text-bone">{shortDate(selected.created)}</span>
              </div>
              <div className="flex justify-between text-[10.5px]">
                <span className="text-fog-faint">Note</span>
                <span className="max-w-[60%] text-right text-bone">{selected.note}</span>
              </div>
            </div>

            <p className="mt-3 text-[9.5px] leading-relaxed text-fog-faint">
              Demo only — approving this draft will not move stock. Both sites would confirm
              the count before the ledger changes.
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="min-h-10 flex-1 rounded-lg border border-white/10 bg-white/[0.03] text-[11.5px] font-semibold text-fog hover:text-bone"
              >
                Keep as draft
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmed((current) => [...current, selected.id]);
                  setSelected(null);
                }}
                className="min-h-10 flex-1 rounded-lg bg-lime-400 text-[11.5px] font-bold text-ink-950 hover:bg-lime-300"
              >
                Approve (demo)
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
