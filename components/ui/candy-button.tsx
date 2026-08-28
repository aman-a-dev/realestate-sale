import React from "react";
import { cn } from "@/lib/utils";

export interface CandyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function CandyButton({
  className,
  children = "Candy Button",
  ...props
}: CandyButtonProps) {
  return (
    <button
      className={cn(
        "relative text-primary-foreground font-semibold text-base leading-[22px] tracking-[0.02em]",
        "px-9 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-out",
        "border border-primary/50 bg-primary",
        "shadow-[0px_4px_48px_-12px_hsl(var(--primary)/0.6),inset_0px_1px_8px_-4px_hsl(var(--primary-foreground)/0.4)]",
        "active:scale-95 active:rotate-1",
        "after:absolute after:top-[1px] after:right-[10%] after:w-[60%] after:h-[1px]",
        "after:bg-gradient-to-r after:from-transparent after:via-primary-foreground/50 after:to-transparent",
        "hover:brightness-110",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default CandyButton;
