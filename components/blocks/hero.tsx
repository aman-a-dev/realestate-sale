"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  Variants,
} from "framer-motion";
import {
  Search,
  MapPin,
  X,
  Home,
  Building2,
  TrendingUp,
  ArrowRight,
  Star,
  Pin,
  HousePlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { properties } from "@/lib/properties";
import { StaggeredPopInView } from "@/components/primitives/staggered-popin-view";

// --- helpers ---
const formatPrice = (price: number, status: string) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(price);
  return status === "For Rent" ? `${formatted}/mo` : formatted;
};

const getPropertyIcon = (type: string) => {
  switch (type) {
    case "Villa":
      return <Home size={18} />;
    case "Penthouse":
      return <TrendingUp size={18} />;
    default:
      return <Building2 size={18} />;
  }
};

// --- Animation variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 18,
    },
  },
};

const dropdownItemVariants: Variants = {
  hidden: { opacity: 0, x: -10, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.04,
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  }),
  exit: { opacity: 0, x: -10, scale: 0.98 },
};

// --- Hero component ---
export default function Hero() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 40, damping: 25 };
  const bgX = useSpring(mouseX, springConfig);
  const bgY = useSpring(mouseY, springConfig);

  // ✅ FIX: Prevents layout shift/vibration when navbar locks body scroll
  useEffect(() => {
    // Reserves space for the scrollbar so the viewport width doesn't change
    // when the navbar applies `overflow: hidden` to the html element.
    document.documentElement.style.scrollbarGutter = "stable";
    return () => {
      document.documentElement.style.scrollbarGutter = "";
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 60);
      mouseY.set((clientY - innerHeight / 2) / 60);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return properties
      .filter((p) => {
        const matchTitle = p.title?.toLowerCase().includes(lowerQuery) || false;
        const matchCity = p.city?.toLowerCase().includes(lowerQuery) || false;
        const matchLocation =
          p.location?.toLowerCase().includes(lowerQuery) || false;
        const matchType = p.type?.toLowerCase().includes(lowerQuery) || false;
        const matchTags =
          p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          false;
        return (
          matchTitle || matchCity || matchLocation || matchType || matchTags
        );
      })
      .slice(0, 5);
  }, [query]);

  const showDropdown = isFocused && query.trim().length > 0;

  return (
    // ✅ FIX: Changed min-h-screen to min-h-[100dvh] to prevent vertical mobile address bar jitter
    <section className="relative w-full min-h-[100dvh] bg-background overflow-x-hidden">
      {/* ============================================================
          LAYER 1 (z-0): DOCHNAH text — More top spacing, centered on mobile
          ============================================================ */}
      <motion.div
        className="absolute inset-0 z-0 flex items-start justify-center sm:justify-start pointer-events-none select-none px-4 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1
          className="font-black font-[serif] tracking-tighter text-foreground leading-[0.82] whitespace-nowrap max-w-full text-center sm:text-left"
          style={{
            fontSize: "clamp(3rem, 16vw, 14rem)",
            marginLeft: "max(-2vw, -1rem)",
            marginTop: "max(3vh, 1rem)",
          }}
        >
          <StaggeredPopInView text="EthioBest" inView={true} duration={0.08} />
        </h1>
      </motion.div>

      {/* ============================================================
          LAYER 2 (z-10): House background image — MIDDLE layer
          ============================================================ */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <motion.img
          src="/hero-image.png"
          alt="Luxury Home"
          className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,1)]"
          draggable={false}
          style={{ x: bgX, y: bgY }}
          initial={{ scale: 1.03, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
        />

        {/* Cinematic bottom blur/fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background via-background/60 to-transparent backdrop-blur-[2px]" />
      </div>

      {/* ============================================================
          LAYER 3 (z-20): Top content — Reduced top padding, RealEstate closer to DOCHNAH
          ============================================================ */}
      <motion.div
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* RealEstate cursive text — Reduced margin-top to be closer to DOCHNAH */}
        <motion.div
          variants={itemVariants}
          className="w-full flex justify-center sm:justify-end pr-0 sm:pr-8 md:pr-16 lg:pr-24 mb-1 sm:mb-2"
        >
          <h2
            className="font-[cursive] text-foreground lg:text-background drop-shadow-sm text-center sm:text-right"
            style={{
              fontSize: "clamp(2rem, 7vw, 5.5rem)",
              lineHeight: 1,
              marginTop: "0.5rem",
            }}
          >
            RealEstate
          </h2>
        </motion.div>

        {/* subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground text-center mb-6 sm:mb-8 px-4 drop-shadow-md max-w-2xl"
        >
          Find a Place You'll Love to Call Home
        </motion.p>

        {/* --- Search bar --- */}
        <motion.div
          ref={containerRef}
          variants={itemVariants}
          className="relative w-full max-w-2xl mx-auto"
        >
          {/* Search input wrapper with padding */}
          <div className="px-4 sm:px-0">
            <motion.div
              animate={{
                scale: isFocused ? 1.02 : 1,
                boxShadow: isFocused
                  ? "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 2px hsl(var(--primary) / 0.2)"
                  : "0 20px 40px -10px rgba(0,0,0,0.15)",
              }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 25,
              }}
              className="relative w-full bg-card rounded-full overflow-visible flex items-center border border-border"
            >
              <div className="absolute left-0 flex items-center pl-5 sm:pl-7 pointer-events-none">
                <motion.div
                  animate={
                    isFocused
                      ? { scale: 1.1, rotate: -10 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <Search
                    size={20}
                    className="sm:w-6 sm:h-6 text-muted-foreground"
                  />
                </motion.div>
              </div>
              <Input
                type="text"
                placeholder="Search properties..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="w-full bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg py-5 sm:py-6 pl-14 sm:pl-20 pr-32 sm:pr-40 font-[cursive] sm:font-sans rounded-full"
              />
              <div className="absolute right-0 flex items-center pr-2 sm:pr-3 gap-2">
                <AnimatePresence>
                  {query && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.6, width: 0 }}
                      animate={{ opacity: 1, scale: 1, width: "auto" }}
                      exit={{ opacity: 0, scale: 0.6, width: 0 }}
                      onClick={() => setQuery("")}
                      className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <X size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-7 sm:py-2.5 bg-primary text-primary-foreground rounded-full text-sm sm:text-base font-medium shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <ArrowRight size={18} className="sm:hidden" />
                  <span className="hidden sm:inline">Search</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* --- Search dropdown results — Always centered, matches input width --- */}
          <AnimatePresence mode="wait">
            {showDropdown && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -12,
                  scale: 0.96,
                  filter: "blur(8px)",
                }}
                animate={{ opacity: 1, y: 10, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, scale: 0.96, filter: "blur(8px)" }}
                transition={{
                  type: "spring" as const,
                  stiffness: 350,
                  damping: 30,
                }}
                className="absolute z-50 mt-4 bg-popover/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl ring-1 ring-black/5 max-h-[420px] overflow-y-auto"
                style={{
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                  width: "min(calc(100% - 2rem), 42rem)",
                  maxWidth: "calc(100vw - 2rem)",
                }}
              >
                {results.length > 0 ? (
                  <div className="p-2">
                    <div className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {results.length} properties found
                      </span>
                      <span className="text-[10px] font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">
                        TOP MATCHES
                      </span>
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {results.map((property, index) => (
                        <motion.div
                          key={property.id}
                          custom={index}
                          variants={dropdownItemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <Link
                            href={`/properties/${property.id}`}
                            className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-accent transition-all duration-200 group"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary flex items-center justify-center group-hover:from-primary group-hover:to-primary/90 group-hover:text-primary-foreground transition-all duration-300 shadow-sm"
                            >
                              {getPropertyIcon(property.type)}
                            </motion.div>
                            <div className="flex-1 min-w-0 text-left">
                              <h4 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
                                {property.title}
                              </h4>
                              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                                <MapPin
                                  size={11}
                                  className="flex-shrink-0 text-muted-foreground/60"
                                />
                                <span className="truncate">
                                  {property.location}, {property.city}
                                </span>
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0 hidden sm:block">
                              <p className="text-sm font-bold text-foreground tabular-nums">
                                {formatPrice(property.price, property.status)}
                              </p>
                              <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                                {property.beds} bd · {property.baths} ba
                              </p>
                            </div>
                            <motion.div
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex-shrink-0"
                            >
                              <ArrowRight
                                size={16}
                                className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                              />
                            </motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-2 mx-2 px-4 py-3 bg-muted/50 rounded-xl border border-border text-xs text-muted-foreground flex justify-between items-center"
                    >
                      <span className="flex items-center gap-2">
                        <kbd className="px-2 py-0.5 bg-background rounded-md border border-border text-[10px] font-mono shadow-sm">
                          ↵
                        </kbd>
                        <span>Press Enter to see all results</span>
                      </span>
                      <Link
                        href="/properties"
                        className="text-primary font-medium hover:underline underline-offset-2"
                      >
                        View all
                      </Link>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 text-center"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                      className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center text-2xl mb-4 shadow-inner"
                    >
                      🔍
                    </motion.div>
                    <p className="text-sm font-semibold text-foreground">
                      No properties found
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto leading-relaxed">
                      Try searching for{" "}
                      <span className="text-primary font-medium">"Bole"</span>,{" "}
                      <span className="text-primary font-medium">
                        "Bahir Dar"
                      </span>
                      , or{" "}
                      <span className="text-primary font-medium">"Pool"</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* quick action buttons / stats */}
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 text-sm px-4"
        >
          {[
            { icon: HousePlus, value: "500+", label: "luxury listings" },
            { icon: Pin, value: "12", label: "cities" },
            { icon: Star, value: "4.9", label: "average rating" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-lg cursor-default"
            >
              <stat.icon size={17} className="text-muted-foreground" />
              <span className="font-bold text-foreground tabular-nums">
                {stat.value}
              </span>
              <span className="text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
