"use client";

import { AnimatedCounter } from "@/components/primitives/animated-counter";
import { motion, Variants } from "framer-motion";
import { Home, Users, Trophy } from "lucide-react";
import { StaggeredPopInView } from "@/components/primitives/staggered-popin-view";

const statistics = [
  {
    id: 1,
    value: 500,
    suffix: "+",
    label: "Properties Sold",
    icon: Home,
  },
  {
    id: 2,
    value: 1200,
    suffix: "+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    id: 3,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    icon: Trophy,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Statistics() {
  return (
    <section className="relative px-4 py-16 md:py-32 bg-background overflow-hidden">
      {/* Cool Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4 md:mb-6"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium border border-primary/20">
              Trusted by Thousands
            </span>
          </motion.div>

          {/* Title - Simplified for better visibility */}
          <div className="mb-2 md:mb-4">
            <StaggeredPopInView
              text="Our Impact In"
              inView={true}
              duration={0.08}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground tracking-tight"
            />
          </div>
          <div>
            <StaggeredPopInView
              text="Numbers"
              inView={true}
              duration={0.08}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground tracking-tight"
            />
          </div>

          {/* FlipFadeText with better visibility */}
          <div>
            <StaggeredPopInView
              text="We are more then real estate We plan build and deliver dream homes"
              inView={true}
              duration={0.01}
              className="text-base sm:text-lg md:text-xl font-light text-muted-foreground tracking-normal normal-case max-w-2xl mx-auto"
            />
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {statistics.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="group relative flex flex-col items-center text-center p-6 sm:p-8 md:p-10 rounded-3xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/5"
              >
                {/* Inner Glow on Hover */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Decorative Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[40px] rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="relative mb-4 md:mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors shadow-inner"
                >
                  <Icon
                    className="w-7 h-7 sm:w-8 sm:h-8 text-primary"
                    strokeWidth={2.5}
                  />
                  {/* Icon Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </motion.div>

                {/* Value */}
                <div className="relative mb-1 md:mb-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter bg-linear-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
