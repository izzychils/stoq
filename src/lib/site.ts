export const SITE = {
  name: "Stoq",
  domain: "stoq.xyz",
  tagline: "Inventory intelligence for every aisle",
  description:
    "Multi-location stock, demand forecasts and reorder suggestions in one operational view.",
  company: "Ivents",
  companyLine: "Stoq is a product of Ivents.",
  email: "hello@stoq.xyz",
  phone: "+234 812 000 7712",
  city: "Lagos, Nigeria",
  location: "Lagos, Nigeria",
  lastUpdated: "4 November 2026",
};

export const MARKETING_NAV = [
  { label: "Platform", href: "/platform" },
  { label: "Forecasting", href: "/forecast" },
  { label: "Multi-location", href: "/locations" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
] as const;

export const PLATFORM_MENU = [
  {
    title: "Stock visibility",
    description: "Every SKU, every store, every warehouse.",
    href: "/platform",
    icon: "boxes",
  },
  {
    title: "Demand forecasting",
    description: "Predict the next 8 weeks per product.",
    href: "/forecast",
    icon: "trending",
  },
  {
    title: "Automated restocking",
    description: "Reorder points that follow real velocity.",
    href: "/reorder",
    icon: "refresh",
  },
  {
    title: "Supplier operations",
    description: "Purchase orders, lead times, receipts.",
    href: "/suppliers",
    icon: "truck",
  },
  {
    title: "Transfers & counts",
    description: "Move stock, reconcile counts, keep one ledger.",
    href: "/locations",
    icon: "arrows",
  },
  {
    title: "Stock assistant",
    description: "Ask your inventory anything, in plain language.",
    href: "/assistant",
    icon: "sparkles",
  },
] as const;

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "layout" },
  { label: "Inventory", href: "/dashboard/inventory", icon: "boxes" },
  { label: "Locations", href: "/dashboard/locations", icon: "building" },
  { label: "Transfers", href: "/dashboard/transfers", icon: "arrows" },
  { label: "Suppliers", href: "/dashboard/suppliers", icon: "truck" },
  { label: "Purchase orders", href: "/dashboard/purchase-orders", icon: "file" },
  { label: "Sales", href: "/dashboard/sales", icon: "cart" },
  { label: "Forecast", href: "/dashboard/forecast", icon: "trending" },
  { label: "Assistant", href: "/dashboard/assistant", icon: "sparkles" },
] as const;

export const DASHBOARD_SECONDARY_NAV = [
  { label: "Analytics", href: "/dashboard/analytics", icon: "chart" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
] as const;

export const LOCATIONS = [
  { id: "ikeja", name: "Ikeja Warehouse", type: "Warehouse", city: "Lagos", staff: 18 },
  { id: "yaba", name: "Yaba Retail", type: "Retail store", city: "Lagos", staff: 9 },
  { id: "lekki", name: "Lekki Store", type: "Retail store", city: "Lagos", staff: 11 },
  { id: "online", name: "Online Fulfilment", type: "Dark store", city: "Lagos", staff: 6 },
] as const;
