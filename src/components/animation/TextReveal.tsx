"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  staggerDelay = 0.08,
  as: Tag = "h2",
}: TextRevealProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const words = text.split(" ");

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
