import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function SectionLabel({ children, dark = true, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "block mb-4 font-body text-sm font-medium tracking-wide",
        dark ? "text-gold" : "text-gold-dark",
        className
      )}
    >
      {children}
    </span>
  );
}
