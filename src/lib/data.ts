/* ------------------------------------------------------------------ types */

export type StockStatus = "healthy" | "low" | "critical" | "out";

export type LocationId = "ikeja" | "yaba" | "lekki" | "online";

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  barcode: string;
  price: number;
  cost: number;
  reorderPoint: number;
  velocity: number; // units sold per week
  supplier: string;
  stock: Record<LocationId, number>;
};

export type Location = {
  id: LocationId;
  name: string;
  type: string;
  address: string;
  staff: number;
  capacity: number;
  manager: string;
};

export type Transfer = {
  id: string;
  from: LocationId;
  to: LocationId;
  items: number;
  units: number;
  status: "draft" | "in-transit" | "received";
  created: string;
  note: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  leadTime: number;
  reliability: number;
  outstanding: number;
  skus: number;
  terms: string;
};

export type PurchaseOrder = {
  id: string;
  supplier: string;
  items: number;
  units: number;
  value: number;
  status: "draft" | "sent" | "in-transit" | "received";
  eta: string;
  destination: string;
};

export type SalesOrder = {
  id: string;
  channel: "Walk-in" | "Online" | "Wholesale";
  customer: string;
  items: number;
  units: number;
  value: number;
  location: LocationId;
  time: string;
  payment: "Card" | "Transfer" | "Cash";
};

export type AlertItem = {
  id: string;
  productId: string;
  product: string;
  type: "low-stock" | "out-of-stock" | "overstock" | "velocity";
  severity: "high" | "medium" | "low";
  message: string;
  suggestedQty: number;
  destination: string;
};

/* --------------------------------------------------------------- locations */

export const locations: Location[] = [
  {
    id: "ikeja",
    name: "Ikeja Warehouse",
    type: "Central warehouse",
    address: "Oba Akran Avenue, Ikeja",
    staff: 18,
    capacity: 82,
    manager: "Kola Adebayo",
  },
  {
    id: "yaba",
    name: "Yaba Retail",
    type: "Retail store",
    address: "Herbert Macaulay Way, Yaba",
    staff: 9,
    capacity: 64,
    manager: "Ifeoma Nnaji",
  },
  {
    id: "lekki",
    name: "Lekki Store",
    type: "Retail store",
    address: "Admiralty Way, Lekki Phase 1",
    staff: 11,
    capacity: 71,
    manager: "Tomiwa Salami",
  },
  {
    id: "online",
    name: "Online Fulfilment",
    type: "Dark store",
    address: "Ikate, Lekki",
    staff: 6,
    capacity: 46,
    manager: "Grace Umeh",
  },
];

export const locationName = (id: LocationId) =>
  locations.find((location) => location.id === id)?.name ?? id;

/* ---------------------------------------------------------------- products */

export const products: Product[] = [
  {
    id: "p-rice-50",
    sku: "GRN-RICE-50",
    name: "Long grain rice",
    category: "Grains",
    unit: "50 kg bag",
    barcode: "6001234500017",
    price: 92000,
    cost: 78500,
    reorderPoint: 60,
    velocity: 74,
    supplier: "Golden Harvest Ltd",
    stock: { ikeja: 128, yaba: 34, lekki: 28, online: 12 },
  },
  {
    id: "p-oil-5l",
    sku: "GRC-OIL-05",
    name: "Vegetable oil",
    category: "Groceries",
    unit: "5 L bottle",
    barcode: "6001234500024",
    price: 12400,
    cost: 9850,
    reorderPoint: 90,
    velocity: 168,
    supplier: "Golden Harvest Ltd",
    stock: { ikeja: 96, yaba: 41, lekki: 36, online: 22 },
  },
  {
    id: "p-detergent-1",
    sku: "HOM-DET-01",
    name: "Washing detergent",
    category: "Home care",
    unit: "1 kg pack",
    barcode: "6001234500031",
    price: 4200,
    cost: 2950,
    reorderPoint: 120,
    velocity: 196,
    supplier: "BrightHome Distribution",
    stock: { ikeja: 44, yaba: 18, lekki: 12, online: 9 },
  },
  {
    id: "p-water-75",
    sku: "BEV-WTR-75",
    name: "Bottled water",
    category: "Beverages",
    unit: "75 cl · pack of 12",
    barcode: "6001234500048",
    price: 3600,
    cost: 2450,
    reorderPoint: 200,
    velocity: 412,
    supplier: "BlueRock Beverages",
    stock: { ikeja: 340, yaba: 128, lekki: 96, online: 64 },
  },
  {
    id: "p-cola-50",
    sku: "BEV-COL-50",
    name: "Carbonated soft drink",
    category: "Beverages",
    unit: "50 cl · crate of 12",
    barcode: "6001234500055",
    price: 5400,
    cost: 4100,
    reorderPoint: 80,
    velocity: 214,
    supplier: "BlueRock Beverages",
    stock: { ikeja: 76, yaba: 22, lekki: 18, online: 14 },
  },
  {
    id: "p-tomato-400",
    sku: "GRC-TMT-40",
    name: "Tomato paste",
    category: "Groceries",
    unit: "400 g tin",
    barcode: "6001234500062",
    price: 950,
    cost: 640,
    reorderPoint: 300,
    velocity: 524,
    supplier: "SunFarm Foods",
    stock: { ikeja: 412, yaba: 96, lekki: 72, online: 48 },
  },
  {
    id: "p-sugar-50",
    sku: "GRN-SGR-50",
    name: "Refined sugar",
    category: "Grains",
    unit: "50 kg bag",
    barcode: "6001234500079",
    price: 86000,
    cost: 73000,
    reorderPoint: 30,
    velocity: 38,
    supplier: "Golden Harvest Ltd",
    stock: { ikeja: 18, yaba: 6, lekki: 4, online: 0 },
  },
  {
    id: "p-toothpaste",
    sku: "HOM-TTH-14",
    name: "Toothpaste",
    category: "Personal care",
    unit: "140 g tube",
    barcode: "6001234500086",
    price: 1800,
    cost: 1150,
    reorderPoint: 150,
    velocity: 188,
    supplier: "BrightHome Distribution",
    stock: { ikeja: 132, yaba: 44, lekki: 32, online: 21 },
  },
  {
    id: "p-tissue-10",
    sku: "HOM-TIS-10",
    name: "Toilet tissue",
    category: "Home care",
    unit: "10-roll pack",
    barcode: "6001234500093",
    price: 3200,
    cost: 2150,
    reorderPoint: 110,
    velocity: 164,
    supplier: "BrightHome Distribution",
    stock: { ikeja: 51, yaba: 26, lekki: 19, online: 8 },
  },
  {
    id: "p-gas-125",
    sku: "HOM-GAS-12",
    name: "Cooking gas refill",
    category: "Home care",
    unit: "12.5 kg cylinder",
    barcode: "6001234500109",
    price: 18500,
    cost: 15200,
    reorderPoint: 40,
    velocity: 96,
    supplier: "Northline Energy",
    stock: { ikeja: 62, yaba: 18, lekki: 14, online: 0 },
  },
  {
    id: "p-milk-900",
    sku: "GRC-MLK-90",
    name: "Milk powder",
    category: "Groceries",
    unit: "900 g tin",
    barcode: "6001234500116",
    price: 14500,
    cost: 11800,
    reorderPoint: 70,
    velocity: 102,
    supplier: "SunFarm Foods",
    stock: { ikeja: 88, yaba: 31, lekki: 24, online: 16 },
  },
  {
    id: "p-noodles",
    sku: "GRC-NDL-40",
    name: "Instant noodles",
    category: "Groceries",
    unit: "carton of 40",
    barcode: "6001234500123",
    price: 9800,
    cost: 7600,
    reorderPoint: 95,
    velocity: 232,
    supplier: "SunFarm Foods",
    stock: { ikeja: 44, yaba: 16, lekki: 12, online: 6 },
  },
  {
    id: "p-soap-bar",
    sku: "HOM-SOP-20",
    name: "Laundry bar soap",
    category: "Home care",
    unit: "pack of 20",
    barcode: "6001234500130",
    price: 4600,
    cost: 3300,
    reorderPoint: 85,
    velocity: 148,
    supplier: "BrightHome Distribution",
    stock: { ikeja: 108, yaba: 38, lekki: 31, online: 18 },
  },
  {
    id: "p-diapers-m",
    sku: "BAB-DIA-M",
    name: "Baby diapers",
    category: "Personal care",
    unit: "medium · pack of 40",
    barcode: "6001234500147",
    price: 9800,
    cost: 7400,
    reorderPoint: 60,
    velocity: 112,
    supplier: "CuddleCare Ltd",
    stock: { ikeja: 21, yaba: 8, lekki: 11, online: 5 },
  },
  {
    id: "p-energy-250",
    sku: "BEV-ENG-25",
    name: "Energy drink",
    category: "Beverages",
    unit: "250 ml · pack of 6",
    barcode: "6001234500154",
    price: 3900,
    cost: 2750,
    reorderPoint: 120,
    velocity: 206,
    supplier: "BlueRock Beverages",
    stock: { ikeja: 156, yaba: 48, lekki: 41, online: 29 },
  },
  {
    id: "p-biscuit",
    sku: "SNK-BIS-24",
    name: "Biscuit carton",
    category: "Snacks",
    unit: "carton of 24",
    barcode: "6001234500161",
    price: 6200,
    cost: 4500,
    reorderPoint: 75,
    velocity: 138,
    supplier: "SunFarm Foods",
    stock: { ikeja: 34, yaba: 14, lekki: 9, online: 4 },
  },
  {
    id: "p-coffee-200",
    sku: "BEV-COF-20",
    name: "Instant coffee",
    category: "Beverages",
    unit: "200 g jar",
    barcode: "6001234500178",
    price: 7800,
    cost: 5900,
    reorderPoint: 45,
    velocity: 54,
    supplier: "Highland Roasters",
    stock: { ikeja: 62, yaba: 18, lekki: 14, online: 7 },
  },
  {
    id: "p-airfresh",
    sku: "HOM-AIR-30",
    name: "Air freshener",
    category: "Home care",
    unit: "300 ml aerosol",
    barcode: "6001234500185",
    price: 2900,
    cost: 1900,
    reorderPoint: 60,
    velocity: 42,
    supplier: "BrightHome Distribution",
    stock: { ikeja: 74, yaba: 22, lekki: 18, online: 9 },
  },
];

export function totalStock(product: Product) {
  return Object.values(product.stock).reduce((sum, value) => sum + value, 0);
}

export function stockStatus(product: Product): StockStatus {
  const total = totalStock(product);
  if (total === 0) return "out";
  if (total <= product.reorderPoint * 0.6) return "critical";
  if (total <= product.reorderPoint) return "low";
  return "healthy";
}

export const totalStockValue = products.reduce(
  (sum, product) => sum + totalStock(product) * product.cost,
  0,
);

/* --------------------------------------------------------------- transfers */

export const transfers: Transfer[] = [
  {
    id: "TR-4412",
    from: "ikeja",
    to: "lekki",
    items: 3,
    units: 124,
    status: "in-transit",
    created: "2026-11-04",
    note: "Weekend replenishment · Lekki",
  },
  {
    id: "TR-4411",
    from: "ikeja",
    to: "yaba",
    items: 5,
    units: 310,
    status: "received",
    created: "2026-11-03",
    note: "Noodles & detergent top-up",
  },
  {
    id: "TR-4410",
    from: "yaba",
    to: "online",
    items: 2,
    units: 68,
    status: "received",
    created: "2026-11-02",
    note: "Fulfilment buffer stock",
  },
  {
    id: "TR-4409",
    from: "lekki",
    to: "ikeja",
    items: 1,
    units: 18,
    status: "draft",
    created: "2026-11-05",
    note: "Return slow-moving coffee",
  },
  {
    id: "TR-4408",
    from: "ikeja",
    to: "lekki",
    items: 4,
    units: 96,
    status: "in-transit",
    created: "2026-11-04",
    note: "Beverage pre-stock for the weekend",
  },
];

/* --------------------------------------------------------------- suppliers */

export const suppliers: Supplier[] = [
  {
    id: "sup-01",
    name: "Golden Harvest Ltd",
    contact: "orders@goldenharvest.example",
    leadTime: 4,
    reliability: 96,
    outstanding: 4280000,
    skus: 12,
    terms: "Net 30",
  },
  {
    id: "sup-02",
    name: "BlueRock Beverages",
    contact: "trade@bluerock.example",
    leadTime: 2,
    reliability: 93,
    outstanding: 1860000,
    skus: 8,
    terms: "Net 21",
  },
  {
    id: "sup-03",
    name: "SunFarm Foods",
    contact: "supply@sunfarm.example",
    leadTime: 3,
    reliability: 89,
    outstanding: 2140000,
    skus: 21,
    terms: "Net 30",
  },
  {
    id: "sup-04",
    name: "BrightHome Distribution",
    contact: "orders@brighthome.example",
    leadTime: 5,
    reliability: 91,
    outstanding: 940000,
    skus: 17,
    terms: "Net 14",
  },
  {
    id: "sup-05",
    name: "CuddleCare Ltd",
    contact: "care@cuddlecare.example",
    leadTime: 3,
    reliability: 95,
    outstanding: 0,
    skus: 4,
    terms: "Net 30",
  },
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2214",
    supplier: "SunFarm Foods",
    items: 4,
    units: 960,
    value: 2840000,
    status: "in-transit",
    eta: "2026-11-08",
    destination: "Ikeja Warehouse",
  },
  {
    id: "PO-2213",
    supplier: "BrightHome Distribution",
    items: 3,
    units: 480,
    value: 1260000,
    status: "sent",
    eta: "2026-11-10",
    destination: "Ikeja Warehouse",
  },
  {
    id: "PO-2212",
    supplier: "BlueRock Beverages",
    items: 2,
    units: 720,
    value: 2160000,
    status: "received",
    eta: "2026-11-03",
    destination: "Ikeja Warehouse",
  },
  {
    id: "PO-2211",
    supplier: "Golden Harvest Ltd",
    items: 3,
    units: 260,
    value: 4120000,
    status: "received",
    eta: "2026-10-30",
    destination: "Ikeja Warehouse",
  },
  {
    id: "PO-2210",
    supplier: "CuddleCare Ltd",
    items: 1,
    units: 120,
    value: 888000,
    status: "draft",
    eta: "2026-11-14",
    destination: "Yaba Retail",
  },
];

/* ------------------------------------------------------------ sales orders */

export const salesOrders: SalesOrder[] = [
  { id: "SO-88231", channel: "Wholesale", customer: "Mara Mart", items: 6, units: 148, value: 1284000, location: "ikeja", time: "11:42", payment: "Transfer" },
  { id: "SO-88230", channel: "Walk-in", customer: "Walk-in customer", items: 3, units: 4, value: 28400, location: "lekki", time: "11:36", payment: "Card" },
  { id: "SO-88229", channel: "Online", customer: "Tolu Ade", items: 2, units: 3, value: 19200, location: "online", time: "11:28", payment: "Card" },
  { id: "SO-88228", channel: "Wholesale", customer: "Shelf & Stone", items: 4, units: 96, value: 842000, location: "ikeja", time: "11:04", payment: "Transfer" },
  { id: "SO-88227", channel: "Walk-in", customer: "Walk-in customer", items: 5, units: 7, value: 41600, location: "yaba", time: "10:51", payment: "Cash" },
  { id: "SO-88226", channel: "Online", customer: "Ada Nwosu", items: 1, units: 2, value: 18400, location: "online", time: "10:33", payment: "Card" },
  { id: "SO-88225", channel: "Walk-in", customer: "Walk-in customer", items: 2, units: 3, value: 12700, location: "lekki", time: "10:18", payment: "Cash" },
  { id: "SO-88224", channel: "Wholesale", customer: "Brightway Stores", items: 5, units: 210, value: 1940000, location: "ikeja", time: "09:57", payment: "Transfer" },
];

/* ----------------------------------------------------------------- alerts */

export const alerts: AlertItem[] = [
  {
    id: "al-1",
    productId: "p-detergent-1",
    product: "Washing detergent",
    type: "low-stock",
    severity: "high",
    message: "83 units chain-wide · 2.9 weeks cover at current rate",
    suggestedQty: 480,
    destination: "Ikeja Warehouse",
  },
  {
    id: "al-2",
    productId: "p-noodles",
    product: "Instant noodles",
    type: "low-stock",
    severity: "high",
    message: "78 units · Yaba has 0.5 weeks of cover",
    suggestedQty: 360,
    destination: "Ikeja Warehouse",
  },
  {
    id: "al-3",
    productId: "p-diapers-m",
    product: "Baby diapers",
    type: "low-stock",
    severity: "medium",
    message: "45 units · below reorder point of 60",
    suggestedQty: 240,
    destination: "Yaba Retail",
  },
  {
    id: "al-4",
    productId: "p-sugar-50",
    product: "Refined sugar",
    type: "out-of-stock",
    severity: "high",
    message: "Online fulfilment is out · 38 bags sell per week",
    suggestedQty: 120,
    destination: "Online Fulfilment",
  },
  {
    id: "al-5",
    productId: "p-coffee-200",
    product: "Instant coffee",
    type: "overstock",
    severity: "low",
    message: "101 units · 13 weeks of cover, slowest SKU in category",
    suggestedQty: 0,
    destination: "Ikeja Warehouse",
  },
  {
    id: "al-6",
    productId: "p-energy-250",
    product: "Energy drink",
    type: "velocity",
    severity: "medium",
    message: "Velocity up 34% week on week · reorder point trails demand",
    suggestedQty: 480,
    destination: "Ikeja Warehouse",
  },
];

/* ----------------------------------------------------------------- series */

export const revenueSeries = [
  { label: "Mon", value: 2840000 },
  { label: "Tue", value: 2410000 },
  { label: "Wed", value: 3120000 },
  { label: "Thu", value: 2960000 },
  { label: "Fri", value: 3480000 },
  { label: "Sat", value: 4210000 },
  { label: "Sun", value: 1870000 },
];

export const monthlyRevenue = [
  { month: "Jun", revenue: 58.4, orders: 4120 },
  { month: "Jul", revenue: 61.2, orders: 4380 },
  { month: "Aug", revenue: 59.8, orders: 4260 },
  { month: "Sep", revenue: 66.1, orders: 4610 },
  { month: "Oct", revenue: 71.4, orders: 4890 },
  { month: "Nov", revenue: 20.9, orders: 1420 },
];

export const categoryMix = [
  { label: "Groceries", value: 34, color: "#5b8cff" },
  { label: "Beverages", value: 24, color: "#d3f36b" },
  { label: "Home care", value: 18, color: "#8aabff" },
  { label: "Grains", value: 12, color: "#f7b955" },
  { label: "Personal care", value: 8, color: "#a78bfa" },
  { label: "Snacks", value: 4, color: "#6f7d97" },
];

export const forecastSeries = [
  { label: "W1", actual: 168, forecast: 166 },
  { label: "W2", actual: 182, forecast: 178 },
  { label: "W3", actual: 174, forecast: 180 },
  { label: "W4", actual: 196, forecast: 191 },
  { label: "W5", actual: 204, forecast: 208 },
  { label: "W6", actual: 0, forecast: 222 },
  { label: "W7", actual: 0, forecast: 231 },
  { label: "W8", actual: 0, forecast: 246 },
];

export const forecastProducts = [
  { name: "Bottled water 75 cl", category: "Beverages", velocity: 412, forecast: 438, confidence: 94, cover: 111, note: "Rising · weekend peak" },
  { name: "Tomato paste 400 g", category: "Groceries", velocity: 524, forecast: 548, confidence: 91, cover: 96, note: "Steady, high volume" },
  { name: "Instant noodles", category: "Groceries", velocity: 232, forecast: 251, confidence: 88, cover: 44, note: "Below cover · reorder" },
  { name: "Washing detergent", category: "Home care", velocity: 196, forecast: 214, confidence: 86, cover: 83, note: "Promo uplift expected" },
  { name: "Energy drink", category: "Beverages", velocity: 206, forecast: 229, confidence: 84, cover: 156, note: "Velocity up 34%" },
  { name: "Instant coffee", category: "Beverages", velocity: 54, forecast: 49, confidence: 79, cover: 101, note: "Slow · reduce cover" },
];

export const topMovers = [
  { name: "Bottled water", units: 412, revenue: 1483200, change: 12.8 },
  { name: "Tomato paste", units: 524, revenue: 497800, change: 6.4 },
  { name: "Instant noodles", units: 232, revenue: 2273600, change: 4.1 },
  { name: "Energy drink", units: 206, revenue: 803400, change: 34.2 },
  { name: "Washing detergent", units: 196, revenue: 823200, change: -2.6 },
];

export const slowMovers = [
  { name: "Instant coffee", cover: 13, units: 54, note: "Cut cover" },
  { name: "Air freshener", cover: 9, units: 42, note: "Shelf review" },
  { name: "Refined sugar 50 kg", cover: 7, units: 38, note: "Wholesale only" },
];

export const branchPerformance = [
  { location: "Ikeja Warehouse", revenue: 2840000, orders: 96, fill: 97, alerts: 2 },
  { location: "Yaba Retail", revenue: 942000, orders: 214, fill: 91, alerts: 3 },
  { location: "Lekki Store", revenue: 1180000, orders: 186, fill: 94, alerts: 1 },
  { location: "Online Fulfilment", revenue: 486000, orders: 132, fill: 88, alerts: 2 },
];

/* -------------------------------------------------------------- assistant */

export const assistantPrompts = [
  "Which products are running low?",
  "How much stock did we sell this week?",
  "Forecast bottled water for the next 8 weeks",
  "What should I transfer to Lekki for the weekend?",
];

export const assistantAnswers: Record<
  string,
  { body: string[]; meta?: string; sources?: string[] }
> = {
  "Which products are running low?": {
    body: [
      "Six products need attention, across three locations:",
      "• Washing detergent — 83 units chain-wide (2.9 weeks cover). Yaba has 0.7 weeks.\n• Instant noodles — 78 units; Yaba is effectively out (0.5 weeks).\n• Baby diapers M — 45 units, below the 60-unit reorder point.\n• Refined sugar 50 kg — 0 at Online Fulfilment, 28 chain-wide.\n• Energy drink — cover is fine, but velocity is up 34% week on week.\n• Instant coffee — overstocked at 13 weeks of cover.",
      "I can consolidate detergent, noodles and diapers into one purchase order, or raise a transfer from Ikeja first. Which would you prefer?",
    ],
    meta: "Scanned 18 SKUs × 4 locations · 5 minutes ago",
  },
  "How much stock did we sell this week?": {
    body: [
      "This week: ₦20.9m across 1,420 orders, up 9.8% on last week.",
      "Saturday was the peak day at ₦4.21m. Wholesale accounted for 47% of revenue, online 12%.",
      "Stock cover is healthy at 86% chain-wide, but Yaba is the constraint: its fill rate dropped to 91% because of detergent and noodle stock-outs.",
    ],
    meta: "Week to 5 November 2026 · all locations",
  },
  "Forecast bottled water for the next 8 weeks": {
    body: [
      "Bottled water is forecast to run at 438 units per week, rising to 512 in the pre-holiday peak. Confidence: 94%.",
      "Current cover is 6.7 weeks (628 units across four locations). Reorder point of 200 is comfortably covered today, but a 480-unit order should land by 19 November to protect the peak.",
      "The model is using the last 26 weeks of sales, weekend uplift (+18%) and the two previous December peaks.",
    ],
    meta: "Forecast model v3 · trained on 26 weeks of this chain's sales",
  },
  "What should I transfer to Lekki for the weekend?": {
    body: [
      "Lekki covers the weekend in 2.4 days at its current rate. Two transfers are worth making:",
      "• 96 units of bottled water from Ikeja — Lekki has 9.1 days of cover, weekend demand is 1.8× weekday.\n• 48 units of energy drink from Ikeja — velocity is up 34% and Lekki is down to 8 units.",
      "Total transfer value: ₦318,400 at cost. Ikeja keeps 5.2 weeks of cover after both moves. Shall I draft TR-4413?",
    ],
    meta: "Transfer engine · considers lead time, cover and weekend uplift",
  },
};

export const testimonials = [
  {
    quote:
      "We stopped guessing what to send to the Lekki store. The transfer suggestions moved our fill rate from 84% to 96% in one quarter.",
    name: "Kola Adebayo",
    role: "Operations Lead, Mara Mart (12 stores)",
    initials: "KA",
  },
  {
    quote:
      "Forecasting used to be a spreadsheet one person understood. Now the buying team opens one screen on Monday and the order is already half-drafted.",
    name: "Ifeoma Nnaji",
    role: "Head of Buying, Shelf & Stone",
    initials: "IN",
  },
  {
    quote:
      "The assistant is the first thing I open. ‘Which products are running low?’ used to take an hour of counting. Now it is a sentence.",
    name: "Tomiwa Salami",
    role: "Founder, Brightway Stores",
    initials: "TS",
  },
];

export const pricing = [
  {
    name: "Store",
    price: 24000,
    annual: 20000,
    description: "One location that needs stock control without the enterprise weight.",
    features: [
      "1 location · up to 5 users",
      "2,000 SKUs",
      "Barcode intake & stock counts",
      "Low-stock alerts",
      "Sales and stock reports",
      "Email support",
    ],
    cta: "Start free for 14 days",
    featured: false,
  },
  {
    name: "Chain",
    price: 68000,
    annual: 56000,
    description: "Multi-location retailers and distributors running one stock ledger.",
    features: [
      "Up to 10 locations · unlimited users",
      "Unlimited SKUs",
      "Inter-location transfers",
      "Demand forecasting (8 weeks)",
      "Automated reorder suggestions",
      "Supplier and purchase order management",
      "AI stock assistant",
      "Priority support",
    ],
    cta: "Talk to our team",
    featured: true,
  },
  {
    name: "Network",
    price: 0,
    annual: 0,
    description: "Warehouses, distributors and chains with bespoke requirements.",
    features: [
      "Unlimited locations",
      "SSO and audit trail",
      "Custom roles and approvals",
      "API and ERP integration",
      "Dedicated implementation",
      "99.9% uptime SLA",
    ],
    cta: "Book a scoping call",
    featured: false,
  },
];

export const faqs = [
  {
    q: "How does Stoq forecast demand?",
    a: "It models each SKU per location from at least 12 weeks of sales history, adjusted for day-of-week seasonality, promotions and trends. Forecasts are shown with a confidence interval, and every suggestion explains the inputs it used.",
  },
  {
    q: "Can I manage stock across stores and a warehouse?",
    a: "Yes. Every SKU carries a quantity per location. Transfers move stock between locations while preserving cost, supplier and batch references, and the receiving location has to confirm before the ledger changes.",
  },
  {
    q: "Does it handle wholesale and retail pricing?",
    a: "Products can carry price lists per channel. Wholesale orders, retail walk-ins and online fulfilment are all recorded against the same stock, with the channel visible in every report.",
  },
  {
    q: "What hardware do I need for barcode scanning?",
    a: "Any USB or Bluetooth barcode scanner that types like a keyboard works with the browser app. Phone cameras can scan QR and EAN codes for intake and stock counts.",
  },
  {
    q: "Can I import my existing product list?",
    a: "Upload a CSV or Excel file. Stoq maps SKU, barcode, name, cost, price and opening stock per location, then shows you a preview before anything is committed.",
  },
  {
    q: "What happens when the connection drops?",
    a: "The web app keeps a local queue of counts and sales made offline and syncs them when the connection returns. Conflicts are surfaced for review rather than silently overwritten.",
  },
];
