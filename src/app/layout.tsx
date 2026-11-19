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
    default: "Stoq: inventory intelligence for every aisle",
    template: "%s · Stoq",
  },
  description:
    "Stoq is the AI stock platform for retailers, wholesalers, distributors and warehouses: multi-location inventory, demand forecasting, automated reordering, supplier management and a stock assistant that answers in plain language.",
  icons: {
    icon: "/icon.svg",
  },
  keywords: [
    "inventory management",
    "stock control software",
    "multi-location inventory",
    "demand forecasting",
    "8-week demand forecast",
    "purchase orders",
    "warehouse software",
    "inventory software Nigeria",
    "retail stock management",
    "reorder point automation",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Business software",
  authors: [{ name: "Stoq" }],
  creator: "Stoq",
  publisher: "Stoq",
  applicationName: "Stoq",
  openGraph: {
    title: "Stoq: inventory intelligence for every aisle",
    description:
      "Multi-location stock, demand forecasts and reorder suggestions in one operational view.",
    url: "https://stoq.xyz",
    siteName: "Stoq",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stoq: inventory intelligence for every aisle",
    description:
      "Know what you have, what is moving, and what to buy next - across every store and warehouse.",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://stoq.xyz/#organization",
      name: "Stoq",
      url: "https://stoq.xyz",
      email: "hello@stoq.xyz",
      telephone: "+2348120007712",
      description:
        "Stoq is the inventory operating system for retailers, wholesalers, distributors and warehouses in Nigeria.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://stoq.xyz/#website",
      url: "https://stoq.xyz",
      name: "Stoq",
      publisher: { "@id": "https://stoq.xyz/#organization" },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: "Stoq",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Inventory management software",
      operatingSystem: "Web browser",
      url: "https://stoq.xyz",
      description:
        "Multi-location stock, eight-week demand forecasting, automated reorder drafts, supplier operations and a stock assistant in one ledger.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "NGN",
        lowPrice: "20000",
        highPrice: "68000",
        offerCount: "3",
      },
      featureList: [
        "Multi-location stock ledger",
        "Eight-week demand forecasting per location",
        "Automated reorder point calculation",
        "Purchase orders and supplier scorecards",
        "Inter-location transfers",
        "Barcode intake and cycle counts",
        "AI stock assistant",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
