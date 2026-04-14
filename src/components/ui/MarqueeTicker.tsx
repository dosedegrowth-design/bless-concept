import { MARQUEE_ITEMS } from "@/lib/constants";

export function MarqueeTicker() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="bg-charcoal py-4 border-t border-b border-white/[0.04] overflow-hidden">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-body text-[0.8rem] font-semibold uppercase tracking-[3px] text-text-light px-6">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
