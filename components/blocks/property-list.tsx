"use client";

import type { Property } from "@/lib/properties";
import PropertyCard from "@/components/custom/property-card";
import { motion } from "framer-motion";
import { CandyButton } from "@/components/ui/candy-button";
import { Home } from "lucide-react";
import Link from "next/link";
import { StaggeredPopInView } from "@/components/primitives/staggered-popin-view";
import { usePathname } from "next/navigation";

interface PropertyListProps {
  properties: Property[];
}

export default function PropertyList({ properties }: PropertyListProps) {
  const pathname = usePathname();

  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-2xl">
            <Home />
          </span>
        </div>
        <h3 className="text-xl font-bold text-foreground">
          No properties found
        </h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter criteria.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Section Header */}
      {pathname === "/" && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          {/* Title - Simplified for better visibility */}
          <div className="mb-2 md:mb-4">
            <StaggeredPopInView
              text="Properties"
              inView={true}
              duration={0.08}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground tracking-tight"
            />
          </div>
          {/* FlipFadeText with better visibility */}
          <div>
            <StaggeredPopInView
              text="Discover from small house to big building"
              inView={true}
              duration={0.01}
              className="text-base sm:text-lg md:text-xl font-light text-muted-foreground tracking-normal normal-case max-w-2xl mx-auto"
            />
          </div>
        </motion.div>
      )}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </section>
      <div className="flex justify-center items-center my-6">
        <Link href="/properties">
          <CandyButton>Explore Properties</CandyButton>
        </Link>
      </div>
    </>
  );
}
