import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AssistantDemo } from "@/components/sections/assistant-demo";
import { Capabilities } from "@/components/sections/capabilities";
import { Cta } from "@/components/sections/cta";
import { Forecast, Reorder } from "@/components/sections/forecast";
import { Hero } from "@/components/sections/hero";
import { Locations } from "@/components/sections/locations";
import { Platform } from "@/components/sections/platform";
import { Faq, Pricing } from "@/components/sections/pricing";
import { Testimonials, Workflow } from "@/components/sections/proof";

export default function HomePage() {
  return (
    <div className="ambient">
      <SiteHeader />
      <main>
        <Hero />
        <Capabilities />
        <Platform />
        <Forecast />
        <Reorder />
        <Locations />
        <AssistantDemo />
        <Workflow />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  );
}
