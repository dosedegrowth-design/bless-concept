"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

const offsets = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: -30 },
  right: { x: 30 },
  none: {},
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
}: FadeInProps) {
  const { ref, isInView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
