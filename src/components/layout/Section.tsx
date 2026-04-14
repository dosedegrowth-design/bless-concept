import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}

export function Section({ children, id, className, dark = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-32 lg:py-36",
        dark ? "bg-black text-white" : "bg-cream text-charcoal",
        className
      )}
    >
      {children}
    </section>
  );
}
