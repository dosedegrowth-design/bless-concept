"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "fadeIn"
  | "scaleIn";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
}

export function AnimateOnScroll({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  threshold = 0.2,
}: AnimateOnScrollProps) {
  // SSR renders everything visible. Only after hydration do we add the hidden
  // state so IntersectionObserver can reveal elements on scroll.
  const [hasHydrated, setHasHydrated] = useState(false);
  const { ref, isInView } = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Before hydration: fully visible (no animation classes).
  // After hydration but not in view: apply .animate-hidden
  // After hydration and in view: apply .animate-visible
  const shouldHide = hasHydrated && !isInView;
  const shouldShow = hasHydrated && isInView;

  return (
    <div
      ref={ref}
      data-variant={variant}
      className={cn(
        shouldHide && "animate-hidden",
        shouldShow && "animate-visible",
        className
      )}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
