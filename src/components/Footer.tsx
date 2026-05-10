"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black py-24 px-6 md:px-24 transition-colors duration-300 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-8 mb-20">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-white.png"
                alt="Logo Pilcodev"
                width={48}
                height={48}
                className="object-contain h-10 w-auto dark:invert-0 invert"
              />
              <span className="text-3xl font-extrabold tracking-tighter text-black dark:text-white">
                Pilcodev<span className="text-neutral-400 dark:text-neutral-600">.</span>
              </span>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 font-light max-w-sm text-lg leading-relaxed">
              Membangun masa depan digital yang lebih baik, satu baris kode pada satu waktu. Kami merekayasa solusi yang mengubah cara bisnis beroperasi.
            </p>
            <div className="mt-4">
              <Link
                href={`https://wa.me/6287776266539?text=${encodeURIComponent("Halo Pilcodev, saya ingin berdiskusi tentang proyek saya.")}`}
                className="group inline-flex items-center gap-2 text-black dark:text-white font-medium hover:opacity-80 transition-opacity border-b border-black dark:border-white pb-1"
              >
                Mulai Proyek Bersama Kami
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div className="flex flex-col gap-5">
              <h4 className="font-semibold text-black dark:text-white tracking-tight uppercase text-xs mb-2 opacity-80">Perusahaan</h4>
              <Link href="/about" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Tentang Kami
              </Link>
              <Link href="/#portfolio" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Portofolio
              </Link>
              <Link href="/#services" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Harga & Layanan
              </Link>
              <Link href="/#testimonials" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Testimoni
              </Link>
              <Link href="/#blog" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Artikel
              </Link>
              <Link href="/#contact" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Kontak
              </Link>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="font-semibold text-black dark:text-white tracking-tight uppercase text-xs mb-2 opacity-80">Layanan</h4>
              <Link href="/services/web-development" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Pengembangan Web
              </Link>
              <Link href="/services/mobile-development" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Aplikasi Mobile
              </Link>
              <Link href="/services/ml-solutions" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Machine Learning
              </Link>
              <Link href="/services/n8n-automation" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Otomasi Bisnis
              </Link>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="font-semibold text-black dark:text-white tracking-tight uppercase text-xs mb-2 opacity-80">Sosial</h4>
              <a href="https://wa.me/6287776266539" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                WhatsApp
              </a>
              <a href="https://www.linkedin.com/in/pilipus-kuncoro-wismoady-a87bb2306/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                LinkedIn
              </a>
              <a href="https://github.com/PILIPSCODE" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                GitHub
              </a>
              <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm font-light flex items-center gap-2 group">
                <span className="w-0 h-px bg-black dark:bg-white transition-all duration-300 group-hover:w-4"></span>
                Website
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="text-neutral-500 dark:text-neutral-500 text-sm font-light">
            © {new Date().getFullYear()} Pilcodev Studio. <span className="block sm:inline">Hak cipta dilindungi undang-undang.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-light">
            <Link href="#" className="text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Site Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
