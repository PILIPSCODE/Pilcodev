"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, LayoutGrid, Globe, Code2, Smartphone, Cpu, Monitor, Zap } from "lucide-react";
import teamData from "@/data/team.json";
import { cn } from "@/lib/utils";
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';

const divisions = [
  "Semua",
  "web dev",
  "backend",
  "mobile",
  "machine learning",
  "desktop",
  "automation",
];

const IconMap: Record<string, any> = {
  "web dev": Globe,
  "backend": Cpu,
  "mobile": Smartphone,
  "machine learning": Zap,
  "desktop": Monitor,
  "automation": Code2,
  "Semua": LayoutGrid,
};

export default function AllTeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("Semua");

  const filteredTeam = useMemo(() => {
    return teamData.filter((member: any) => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            member.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDivision = selectedDivision === "Semua" || member.division === selectedDivision;
      return matchesSearch && matchesDivision;
    });
  }, [searchQuery, selectedDivision]);

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-32 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        {/* Header Section (Matching Portfolio style) */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white mb-6">
            Tim <span className="font-light italic">& Ahli Kami</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl leading-relaxed">
            Kekuatan di balik setiap inovasi. Temui individu berbakat yang berdedikasi tinggi dalam menghadirkan solusi teknologi terbaik.
          </p>
        </div>

        {/* Filters & Search Section (Matching Portfolio style) */}
        <div className="flex flex-col space-y-8 mb-16">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Cari anggota tim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-100 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-12 pr-6 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
              />
            </div>
          </div>

          {/* Division Tabs (Matching Category Tabs in Portfolio) */}
          <div className="flex flex-wrap gap-3 p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-[2rem] w-fit">
            {divisions.map((division) => {
              const Icon = IconMap[division] || LayoutGrid;
              const isActive = selectedDivision === division;
              return (
                <button
                  key={division}
                  onClick={() => setSelectedDivision(division)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                      : "text-neutral-500 hover:text-black dark:hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="capitalize">{division}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Grid (Matching Portfolio item structure) */}
        {filteredTeam.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredTeam.map((member: any, i) => (
              <div key={member.id} className="group relative flex flex-col gap-6">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Social Overlay (Similar to Portfolio Hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {member.social?.linkedin && (
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors">
                          <FaLinkedinIn size={16} />
                        </a>
                      )}
                      {member.social?.instagram && (
                        <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors">
                          <FaInstagram size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-black dark:text-white shadow-xl">
                      {member.division}
                    </span>
                  </div>
                </div>

                <div className="px-4">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono uppercase tracking-widest mb-4">
                    <div className="w-8 h-px bg-neutral-300 dark:bg-neutral-800" />
                    {member.isLead ? "Lead Position" : "Team Member"}
                  </div>
                  <h3 className="text-3xl font-bold text-black dark:text-white mb-2 group-hover:translate-x-2 transition-transform duration-500">
                    {member.name}
                  </h3>
                  <p className="text-lg text-neutral-500 dark:text-neutral-400 font-light mb-6">
                    {member.role}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-black dark:text-white">
                      Professional Member
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="inline-block p-8 bg-neutral-50 dark:bg-neutral-900 rounded-full mb-8">
              <LayoutGrid className="w-12 h-12 text-neutral-300 dark:text-neutral-700" />
            </div>
            <h3 className="text-3xl font-medium mb-4 text-black dark:text-white">Anggota tidak ditemukan</h3>
            <p className="text-neutral-500 dark:text-neutral-500">Coba atur ulang filter atau kata kunci pencarian Anda.</p>
          </div>
        )}
      </div>
    </main>
  );
}
