"use client";

import { useState } from "react";
import { Bell, Building2, CreditCard, Save, ShieldCheck, Users } from "lucide-react";
import { locations, suppliers } from "@/lib/data";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "business", label: "Business", icon: Building2 },
  { id: "locations", label: "Locations", icon: Building2 },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "team", label: "Team", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
] as const;

type TabId = (typeof TABS)[number]["id"];

const NOTIFICATION_ROWS = [
  { label: "Below reorder point", note: "When any SKU crosses its threshold", enabled: true, channel: "Email + in-app" },
  { label: "Stock-out", note: "When a location reaches zero on a selling SKU", enabled: true, channel: "Email + in-app" },
  { label: "Overstock", note: "When cover exceeds 12 weeks", enabled: false, channel: "Weekly digest" },
  { label: "Transfer received", note: "When a destination confirms receipt", enabled: true, channel: "In-app" },
  { label: "Supplier late", note: "When an order passes its ETA", enabled: true, channel: "Email" },
  { label: "Velocity spike", note: "When sales run 25% above forecast", enabled: false, channel: "In-app" },
];

const TEAM = [
  { name: "Kola Adebayo", role: "Owner", scope: "All locations", initials: "KA" },
  { name: "Ifeoma Nnaji", role: "Buyer", scope: "Ikeja, Yaba", initials: "IN" },
  { name: "Tomiwa Salami", role: "Store manager", scope: "Lekki", initials: "TS" },
  { name: "Grace Umeh", role: "Fulfilment lead", scope: "Online", initials: "GU" },
];

export function SettingsPanel() {
  const [tab, setTab] = useState<TabId>("business");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_ROWS.map((row) => [row.label, row.enabled])),
  );

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="grid gap-2.5 lg:grid-cols-[210px_1fr]">
      <nav aria-label="Settings sections" className="glass h-fit rounded-2xl p-2">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            aria-current={tab === item.id ? "page" : undefined}
            className={cn(
              "flex min-h-9 w-full items-center gap-2 rounded-lg px-2.5 text-left text-[11.5px] font-medium transition-colors",
              tab === item.id
                ? "bg-azure-500/12 text-azure-200"
                : "text-fog-dim hover:bg-white/[0.04] hover:text-bone",
            )}
          >
            <item.icon className="size-3.5" aria-hidden />
            {item.label}
          </button>
        ))}
        <div className="mt-2 border-t border-white/[0.06] px-2.5 pt-2 text-[8.5px] leading-relaxed text-fog-faint">
          Demo workspace — changes are not persisted.
        </div>
      </nav>

      <section className="space-y-2.5">
        {tab === "business" ? (
          <div className="glass rounded-2xl p-5">
            <h2 className="text-[13px] font-semibold text-bone">Business profile</h2>
            <p className="mt-0.5 text-[10px] text-fog-faint">
              Appears on purchase orders, receipts and exported reports.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field label="Business name" defaultValue="Mara Mart & Co." />
              <Field label="Trading name" defaultValue="Mara Mart" />
              <Field label="Support email" defaultValue="ops@maramart.example" />
              <Field label="Phone" defaultValue="+234 812 000 7712" />
              <Field label="Default currency" defaultValue="Nigerian naira (₦)" />
              <Field label="Timezone" defaultValue="West Africa (GMT+1)" />
              <div className="sm:col-span-2">
                <Field label="Registered address" defaultValue="14 Oba Akran Avenue, Ikeja, Lagos" />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
              <p className="text-[9.5px] text-fog-faint">
                Tax ID and invoice templates live under billing.
              </p>
              <button
                type="button"
                onClick={save}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-azure-500 px-3 text-[11px] font-bold text-white hover:bg-azure-400"
              >
                <Save className="size-3.5" aria-hidden />
                {saved ? "Saved (demo)" : "Save changes"}
              </button>
            </div>
          </div>
        ) : null}

        {tab === "locations" ? (
          <div className="glass rounded-2xl p-5">
            <h2 className="text-[13px] font-semibold text-bone">Locations</h2>
            <p className="mt-0.5 text-[10px] text-fog-faint">
              Each location has its own stock, capacity and manager.
            </p>
            <div className="mt-4 divide-y divide-white/[0.05]">
              {locations.map((location) => (
                <div key={location.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11.5px] font-semibold text-bone">{location.name}</p>
                    <p className="text-[9px] text-fog-faint">
                      {location.address} · {location.manager}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] text-fog-dim">
                      {location.type}
                    </span>
                    <span className="text-[9px] text-lime-300">Active</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-3 inline-flex min-h-9 items-center rounded-lg border border-white/10 px-3 text-[10.5px] font-semibold text-bone hover:border-white/20"
            >
              Add a location
            </button>
          </div>
        ) : null}

        {tab === "notifications" ? (
          <div className="glass rounded-2xl p-5">
            <h2 className="text-[13px] font-semibold text-bone">Alerts & notifications</h2>
            <p className="mt-0.5 text-[10px] text-fog-faint">
              Choose what reaches the operations team, and where.
            </p>
            <div className="mt-4 divide-y divide-white/[0.05]">
              {NOTIFICATION_ROWS.map((row) => {
                const enabled = notifications[row.label];
                return (
                  <div key={row.label} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-[11px] font-semibold text-bone">{row.label}</p>
                      <p className="text-[9px] text-fog-faint">{row.note}</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="hidden text-[8.5px] text-fog-faint sm:block">{row.channel}</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={enabled}
                        aria-label={`Toggle ${row.label}`}
                        onClick={() =>
                          setNotifications((current) => ({ ...current, [row.label]: !current[row.label] }))
                        }
                        className={cn(
                          "relative h-5 w-9 rounded-full transition-colors",
                          enabled ? "bg-lime-400" : "bg-white/15",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 size-4 rounded-full bg-ink-950 transition-all",
                            enabled ? "left-[18px]" : "left-0.5 bg-white/80",
                          )}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {tab === "team" ? (
          <div className="glass rounded-2xl p-5">
            <h2 className="text-[13px] font-semibold text-bone">Team & roles</h2>
            <p className="mt-0.5 text-[10px] text-fog-faint">
              Scope every person to the locations they actually run.
            </p>
            <div className="mt-4 divide-y divide-white/[0.05]">
              {TEAM.map((member) => (
                <div key={member.name} className="flex items-center gap-3 py-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-azure-500/12 text-[10px] font-bold text-azure-300">
                    {member.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-bone">{member.name}</p>
                    <p className="text-[9px] text-fog-faint">{member.scope}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[8.5px] text-fog-dim">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[9px] text-fog-faint">
              <ShieldCheck className="size-3" aria-hidden />
              Owners can approve orders; store managers can only receive transfers.
            </p>
          </div>
        ) : null}

        {tab === "billing" ? (
          <div className="glass rounded-2xl p-5">
            <h2 className="text-[13px] font-semibold text-bone">Billing</h2>
            <p className="mt-0.5 text-[10px] text-fog-faint">Demo workspace — no payment method attached.</p>

            <div className="mt-4 rounded-xl border border-azure-500/20 bg-azure-500/[0.06] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-bone">Chain plan</p>
                  <p className="text-[9px] text-fog-faint">10 locations · unlimited users · forecasting</p>
                </div>
                <p className="text-[15px] font-bold tnum text-bone">₦56,000/mo</p>
              </div>
              <p className="mt-2 text-[9px] text-lime-300">Annual billing · renewal 5 Nov 2027</p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[9px] uppercase tracking-wide text-fog-faint">Invoices</p>
                <p className="mt-1 text-[11px] text-bone">Last 3 paid · ₦1.68m</p>
                <p className="text-[9px] text-fog-faint">Receipts emailed to ops@maramart.example</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[9px] uppercase tracking-wide text-fog-faint">Suppliers on file</p>
                <p className="mt-1 text-[11px] text-bone">{suppliers.length} active</p>
                <p className="text-[9px] text-fog-faint">Purchase orders are billed separately</p>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-fog-faint">
        {label}
      </span>
      <input
        defaultValue={defaultValue}
        className="mt-1.5 min-h-9 w-full rounded-lg border border-white/[0.08] bg-black/25 px-2.5 text-[11px] text-bone focus:border-azure-500/50 focus:outline-none"
      />
    </label>
  );
}
