"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggeredPopInViewProps {
  text?: string;
  inView?: boolean;
  duration?: number;
  className?: string;
}

export const StaggeredPopInView = ({
  text = "Pop!",
  inView = true,
  duration = 0.08,
  className = "",
}: StaggeredPopInViewProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <h2 className="flex flex-wrap justify-center">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, y: 20 }}
            {...(inView
              ? { whileInView: { scale: 1, y: 0 } }
              : { animate: { scale: 1, y: 0 } })}
            transition={{
              delay: i * duration,
              type: "spring",
              stiffness: 200,
              damping: 12,
            }}
            viewport={{ once: true }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h2>
    </div>
  );
};

export default StaggeredPopInView;
