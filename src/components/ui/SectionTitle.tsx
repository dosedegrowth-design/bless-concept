import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function SectionTitle({ children, dark = true, className }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "font-display text-4xl md:text-5xl lg:text-6xl font-medium capitalize leading-tight",
        dark ? "text-white" : "text-charcoal",
        className
      )}
    >
      {children}
    </h2>
  );
}
