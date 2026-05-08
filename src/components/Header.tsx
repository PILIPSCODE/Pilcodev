"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use scrolled state or if not on home page, force solid background
  const isSolid = scrolled || !isHome;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
      <header 
        className={cn(
          "pointer-events-auto flex items-center justify-between px-6 md:px-12 py-4 w-full transition-all duration-300 relative",
          isSolid 
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20" 
            : "bg-transparent border-transparent shadow-none py-6"
        )}
      >
        <Link href="/" className="flex items-center gap-3 relative z-20" onClick={() => setIsMenuOpen(false)}>
          <Image 
            src="/logo-white.png" 
            alt="Logo Pilcodev" 
            width={32} 
            height={32} 
            className={cn(
              "object-contain h-7 w-auto transition-all duration-300",
              !isSolid ? "invert-0" : "dark:invert-0 invert"
            )}
          />
          <span className={cn(
            "text-xl font-extrabold tracking-tighter transition-colors duration-300",
            !isSolid ? "text-white" : "text-black dark:text-white"
          )}>
            Pilcodev<span className="text-neutral-500">.</span>
          </span>
        </Link>
        
        {/* Desktop Nav - Centered perfectly */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium absolute left-1/2 -translate-x-1/2">
          <Link href="/about" className={cn("transition-colors", !isSolid ? "text-white/80 hover:text-white" : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white")}>Tentang Kami</Link>
          <Link href="/#portfolio" className={cn("transition-colors", !isSolid ? "text-white/80 hover:text-white" : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white")}>Portofolio</Link>
          <Link href="/#services" className={cn("transition-colors", !isSolid ? "text-white/80 hover:text-white" : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white")}>Harga</Link>
          <Link href="/#testimonials" className={cn("transition-colors", !isSolid ? "text-white/80 hover:text-white" : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white")}>Testimoni</Link>
          <Link href="/#blog" className={cn("transition-colors", !isSolid ? "text-white/80 hover:text-white" : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white")}>Artikel</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle 
            className={cn(
              "p-2 rounded-full transition-colors",
              !isSolid 
                ? "text-white hover:bg-white/20" 
                : "text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800"
            )} 
          />
          <Link 
            href={`https://wa.me/6287776266539?text=${encodeURIComponent("Halo Pilcodev, saya ingin berdiskusi tentang proyek saya.")}`}
            className={cn(
              "px-5 py-2 text-sm font-medium rounded-full transition-transform hover:scale-105",
              !isSolid ? "bg-white text-black" : "bg-black text-white dark:bg-white dark:text-black"
            )}
          >
            Mari Berdiskusi
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3 relative z-20">
          <ThemeToggle 
            className={cn(
              "p-2 rounded-full transition-colors",
              !isSolid 
                ? "text-white hover:bg-white/20" 
                : "text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800"
            )} 
          />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={cn("p-1", !isSolid && !isMenuOpen ? "text-white" : "text-black dark:text-white")}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div 
          className={cn(
            "absolute top-full left-0 right-0 p-6 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-xl flex flex-col gap-6 transition-all duration-300 origin-top",
            isMenuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col gap-4 text-center">
            <Link onClick={() => setIsMenuOpen(false)} href="/about" className="text-lg font-medium text-black dark:text-white">Tentang Kami</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/#portfolio" className="text-lg font-medium text-black dark:text-white">Portofolio</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/#services" className="text-lg font-medium text-black dark:text-white">Harga & Layanan</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/#testimonials" className="text-lg font-medium text-black dark:text-white">Testimoni</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/#blog" className="text-lg font-medium text-black dark:text-white">Artikel</Link>
          </nav>
          <Link 
            onClick={() => setIsMenuOpen(false)}
            href={`https://wa.me/6287776266539?text=${encodeURIComponent("Halo Pilcodev, saya ingin berdiskusi tentang proyek saya.")}`}
            className="w-full text-center px-5 py-3 text-sm font-medium rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            Mari Berdiskusi
          </Link>
        </div>
      </header>
    </div>
  );
}
