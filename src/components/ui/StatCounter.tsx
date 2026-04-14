"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import type { Stat } from "@/types";

interface StatCounterProps {
  stat: Stat;
}

export function StatCounter({ stat }: StatCounterProps) {
  const { ref, isInView } = useInView({ threshold: 0.5 });
  const count = useCountUp(stat.value, 2000, isInView);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gold-dark">
        {count}
        {stat.suffix}
      </div>
      <p className="mt-2 font-body text-xs font-medium text-text-muted">
        {stat.label}
      </p>
    </div>
  );
}
