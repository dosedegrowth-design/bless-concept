import Image from "next/image";
import type { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group shrink-0 w-[260px] md:w-[280px]">
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-charcoal rounded-lg">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover grayscale group-hover:[filter:grayscale(0)] group-hover:scale-[1.03] transition-all duration-[600ms]"
          sizes="280px"
        />
      </div>

      {/* Info */}
      <div className="mt-5">
        <h3 className="font-display text-base font-medium text-white">
          {member.name}
        </h3>
        <p className="mt-1 font-body text-sm text-gold-light">{member.role}</p>
        <p className="mt-0.5 font-body text-xs text-text-light">{member.specialty}</p>
      </div>
    </div>
  );
}
