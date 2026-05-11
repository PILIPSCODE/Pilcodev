"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';

interface TeamCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    division: string;
    image: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      instagram?: string;
      behance?: string;
    };
  };
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group relative flex flex-col items-center p-4 rounded-[2.5rem] bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 transition-all duration-700 hover:shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_32px_64px_-15px_rgba(255,255,255,0.05)] overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-neutral-100 dark:bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-[2rem]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
          <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {member.social?.linkedin && (
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all">
                <FaLinkedinIn size={14} />
              </a>
            )}
            {member.social?.instagram && (
              <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-all">
                <FaInstagram size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="text-center z-10 pb-4">
        <h3 className="text-xl font-bold text-black dark:text-white mb-1 tracking-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
          {member.name}
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600 mb-4">
          {member.role}
        </p>
        <div className="flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-[9px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest border border-neutral-200 dark:border-neutral-800 transition-colors group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white">
            {member.division}
            </span>
        </div>
      </div>
    </div>
  );
}
