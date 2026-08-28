import Hero from "@/components/blocks/hero";
import PropertyShowcase from "@/components/blocks/property-showcase";
import PropertyList from "@/components/blocks/property-list";
import { properties } from "@/lib/properties";
import Statistics from "@/components/blocks/statistics";
import Landing from "@/components/blocks/landing";

import FlowingMenu from "@/components/primitives/flowing-menu";

export default function Home() {
  const topProperties = properties.slice(0, 5);
  return (
    <main className="min-h-screen">
      <Hero />
      <PropertyShowcase />
      <Statistics />
      <PropertyList properties={topProperties} />
      <div style={{ height: "600px", position: "relative" }}>
        <FlowingMenu
          items={demoItems}
          speed={15}
          textColor="#120F17"
          bgColor="#ffffff"
          marqueeBgColor="#120F17"
          marqueeTextColor="#ffffff"
          borderColor="#120F17"
        />
      </div>
      <div className="hidden lg:block">
        <Landing />
      </div>
    </main>
  );
}

const demoItems = [
  {
    link: "#",
    text: "Luxury Villas",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&h=400&fit=crop&auto=format",
  },
  {
    link: "#",
    text: "Modern Apartments",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&h=400&fit=crop&auto=format",
  },
  {
    link: "#",
    text: "Family Homes",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&h=400&fit=crop&auto=format",
  },
  {
    link: "#",
    text: "Commercial Spaces",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600&h=400&fit=crop&auto=format",
  },
];
