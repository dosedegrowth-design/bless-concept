"use client";

import { cn } from "@/lib/utils";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variant?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export function AnimateOnScroll({
  children,
  className,
}: AnimateOnScrollProps) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}
