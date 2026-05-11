import Image from "next/image";
import TeamShowcase from "./ui/team-showcase";
import teamData from "@/data/team.json";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export function WhoWeAre() {
  const leadTeam = teamData.filter((member: any) => member.isLead);

  return (
    <section className="relative pt-32 pb-24 px-6 md:px-24 bg-white dark:bg-black overflow-hidden transition-colors duration-300">
      {/* Ethereal Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/5 blur-[150px] rounded-full translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 px-4 py-2 text-sm text-neutral-600 dark:text-white/90">
              <Star className="mr-2 h-4 w-4 text-black dark:text-white" />
              Tentang Pilcodev
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight leading-[1.1]">
              Kami adalah <br />
              <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-300 dark:to-neutral-500 bg-clip-text text-transparent">
                Pilcodev
              </span>
            </h2>

            <p className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl leading-relaxed font-light max-w-xl">
              Sebagai bagian dari <span className="font-medium text-black dark:text-white underline underline-offset-4 decoration-black/20 dark:decoration-white/20">Pilcotech</span>, kami adalah agensi pengembangan software premium yang menggabungkan estetika minimalis dengan teknologi mutakhir untuk menciptakan solusi digital yang tak tertandingi.
            </p>

            <div className="pt-8 border-t border-neutral-100 dark:border-neutral-900">
              <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-500 mb-6 font-bold">Bagian Dari Ekosistem</p>
              <div className="flex items-center gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <Image
                  src="/pilcotech(black).png"
                  alt="Pilcotech"
                  width={160}
                  height={50}
                  className="h-7 w-auto dark:hidden"
                />
                <Image
                  src="/pilcotech(white).png"
                  alt="Pilcotech"
                  width={160}
                  height={50}
                  className="h-7 w-auto hidden dark:block"
                />
              </div>
            </div>
          </div>

          <div className="relative group">
            {/* Decorative background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative aspect-square lg:aspect-[4/3] w-full bg-white/50 dark:bg-neutral-950/50 backdrop-blur-3xl border border-black/5 dark:border-white/10 overflow-hidden rounded-[2rem] shadow-2xl flex items-center justify-center p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/50 via-transparent to-neutral-200/50 dark:from-neutral-800/20 dark:via-transparent dark:to-neutral-900/20 opacity-50" />

              <div className="relative z-10">
                <p className="text-3xl md:text-4xl text-black/90 dark:text-white/90 font-light leading-snug italic tracking-tight mb-6">
                  &quot;Kesederhanaan adalah <br className="hidden md:block" /> kecanggihan tertinggi.&quot;
                </p>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mx-auto" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex flex-col items-center mb-16 text-center">
            <h3 className="text-2xl md:text-4xl font-light tracking-tighter mb-4">
              Tim <span className="font-semibold">Kami</span>
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 font-light max-w-2xl">
              Sekumpulan individu berbakat yang berdedikasi untuk mengubah ide visioner Anda menjadi realitas digital yang luar biasa.
            </p>
          </div>
          <TeamShowcase members={leadTeam} />
          
          <div className="mt-16 text-center">
            <Link href="/about/team" className="text-black dark:text-white text-sm font-medium uppercase tracking-widest hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors pb-2 border-b border-neutral-300 dark:border-neutral-800 hover:border-neutral-600 dark:hover:border-neutral-400 inline-flex items-center gap-2">
              Lihat Semua Tim <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

