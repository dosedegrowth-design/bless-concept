import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:bg-gold-light hover:scale-[1.02] rounded-full",
  secondary:
    "bg-gold text-black hover:bg-gold-light hover:scale-[1.02] rounded-full",
  outline:
    "border border-white/20 text-white bg-transparent hover:bg-white/10 rounded-full",
  ghost:
    "text-gold hover:text-gold-light bg-transparent",
};

export function Button({
  children,
  variant = "primary",
  href,
  className,
  external = false,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-8 py-3 font-display text-base font-medium capitalize transition-all duration-300 cursor-pointer";

  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
