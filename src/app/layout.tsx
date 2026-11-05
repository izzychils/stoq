import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stoq.xyz"),
  title: {
    default: "Stoq — inventory intelligence for every aisle",
    template: "%s · Stoq",
  },
  description:
    "Stoq is the AI stock platform for retailers, wholesalers, distributors and warehouses: multi-location inventory, demand forecasting, automated reordering, supplier management and a stock assistant that answers in plain language.",
  keywords: [
    "inventory management",
    "stock control software",
    "multi-location inventory",
    "demand forecasting",
    "purchase orders",
    "warehouse software",
  ],
  openGraph: {
    title: "Stoq — inventory intelligence for every aisle",
    description:
      "Multi-location stock, demand forecasts and reorder suggestions in one operational view.",
    url: "https://stoq.xyz",
    siteName: "Stoq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stoq — inventory intelligence for every aisle",
    description:
      "Know what you have, what is moving, and what to buy next — across every store and warehouse.",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
