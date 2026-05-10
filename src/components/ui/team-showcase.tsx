"use client";

import { useState, memo } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

interface TeamShowcaseProps {
  members: TeamMember[];
}

export default function TeamShowcase({ members }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24 select-none w-full max-w-7xl mx-auto py-20 px-4 md:px-12 group/showcase">
      {/* Background Reactive Glow */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-1000 transform-gpu will-change-opacity",
          hoveredId ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neutral-200/20 dark:bg-white/5 blur-[120px] rounded-full" />
      </div>

      {/* ── Left: photo grid ── */}
      <div className="relative flex gap-6 md:gap-8 flex-shrink-0 z-10">
        {/* Column 1 */}
        <div className="flex flex-col gap-6 md:gap-8">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[140px] h-[160px] sm:w-[170px] sm:h-[190px] md:w-[220px] md:h-[240px]"
              isActive={hoveredId === member.id}
              isDimmed={hoveredId !== null && hoveredId !== member.id}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6 md:gap-8 mt-[80px] sm:mt-[100px] md:mt-[120px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[150px] h-[170px] sm:w-[180px] sm:h-[200px] md:w-[240px] md:h-[260px]"
              isActive={hoveredId === member.id}
              isDimmed={hoveredId !== null && hoveredId !== member.id}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6 md:gap-8 mt-[40px] sm:mt-[50px] md:mt-[60px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[145px] h-[165px] sm:w-[175px] sm:h-[195px] md:w-[230px] md:h-[250px]"
              isActive={hoveredId === member.id}
              isDimmed={hoveredId !== null && hoveredId !== member.id}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list*/}
      <div className="relative flex flex-col gap-4 lg:gap-6 pt-0 lg:pt-12 flex-1 w-full z-10">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            isActive={hoveredId === member.id}
            isDimmed={hoveredId !== null && hoveredId !== member.id}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

const PhotoCard = memo(({
  member,
  className,
  isActive,
  isDimmed,
  onHover,
}: {
  member: TeamMember;
  className: string;
  isActive: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
}) => {

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[2rem] cursor-pointer flex-shrink-0 transition-[opacity,transform,filter] duration-700 transform-gpu',
        className,
        isDimmed ? 'opacity-30 scale-[0.95] grayscale blur-[2px]' : 'opacity-100 scale-100',
        isActive ? 'z-20 shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(255,255,255,0.1)]' : 'z-10 shadow-xl'
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={cn(
        "absolute inset-0 transition-opacity duration-700 z-10 pointer-events-none",
        isActive ? "opacity-0" : "opacity-40 bg-neutral-900/20 dark:bg-black/40"
      )} />

      <Image
        src={member.image}
        alt={member.name}
        fill
        className={cn(
          "object-cover transition-transform duration-1000 ease-out transform-gpu",
          isActive ? "scale-110" : "scale-100"
        )}
      />

      {/* Decorative inner glow on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 z-10",
        isActive ? "opacity-100" : ""
      )} />
    </div>
  );
});

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

const MemberRow = memo(({
  member,
  isActive,
  isDimmed,
  onHover,
}: {
  member: TeamMember;
  isActive: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
}) => {
  const hasSocial = !!(member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance);

  return (
    <div
      className={cn(
        'group relative cursor-pointer transition-[opacity,transform,background-color,border-color] duration-500 p-6 rounded-3xl border border-transparent transform-gpu',
        isDimmed ? 'opacity-20 scale-[0.98]' : 'opacity-100 scale-100',
        isActive ? 'bg-neutral-100/50 dark:bg-white/5 backdrop-blur-md border-neutral-200 dark:border-white/10 shadow-2xl' : '',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex flex-col gap-1">
        {/* Name + social*/}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'h-[2px] rounded-full transition-all duration-700 ease-out',
                isActive ? 'bg-black dark:bg-white w-12' : 'bg-neutral-300 dark:bg-neutral-800 w-6',
              )}
            />
            <span
              className={cn(
                'text-lg md:text-xl transition-[color,font-weight] duration-500 tracking-tight',
                isActive ? 'text-black dark:text-white font-bold' : 'text-neutral-500 dark:text-neutral-600 font-light',
              )}
            >
              {member.name}
            </span>
          </div>

          {/* Social icons */}
          {hasSocial && (
            <div
              className={cn(
                'flex items-center gap-4 transition-all duration-700',
                isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10 pointer-events-none',
              )}
            >
              {member.social?.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-500 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-125"
                >
                  <FaTwitter size={18} />
                </a>
              )}
              {member.social?.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-500 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-125"
                >
                  <FaLinkedinIn size={18} />
                </a>
              )}
              {member.social?.instagram && (
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-500 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-125"
                >
                  <FaInstagram size={18} />
                </a>
              )}
              {member.social?.behance && (
                <a
                  href={member.social.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-500 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-125"
                >
                  <FaBehance size={18} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Role */}
        <p className={cn(
          "pl-16 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] transition-colors duration-500",
          isActive ? "text-neutral-500 dark:text-neutral-400" : "text-neutral-400 dark:text-neutral-800"
        )}>
          {member.role}
        </p>
      </div>
    </div>
  );
});

