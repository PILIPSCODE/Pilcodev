"use client";

import { cn } from "@/lib/utils";
import { MessageSquare, Lightbulb, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Ngobrol & Cari Solusi",
    description:
      "Kami mulai dengan memahami kebutuhan dan tujuan bisnis Anda, lalu menentukan solusi digital yang paling cocok.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Desain yang Sesuai Brand",
    description:
      "Tampilan dibuat modern, nyaman digunakan, dan tetap sesuai dengan identitas bisnis Anda.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Proses Development",
    description:
      "Website atau aplikasi dibangun menggunakan teknologi modern dengan fokus pada performa dan stabilitas.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "Setelah project selesai dan online, kami tetap siap membantu untuk maintenance maupun pengembangan selanjutnya.",
    icon: Rocket,
  },
];

export function Workflow() {
  return (
    <section className="py-24 px-6 md:px-24 bg-neutral-50 dark:bg-[#050505] transition-colors duration-300 border-y border-neutral-200 dark:border-neutral-900 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-light text-black dark:text-white mb-4 tracking-tight">
            Langkah <span className="font-medium italic">Kerja Kami</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light max-w-2xl mx-auto">
            Kami punya alur kerja yang jelas dan terarah supaya setiap project berjalan lebih rapi, tepat waktu, dan menghasilkan solusi yang benar-benar sesuai kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Step Number Badge */}
                <div className="mb-8 relative">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-black border-2 border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xl font-bold text-black dark:text-white z-10 relative group-hover:border-black dark:group-hover:border-white transition-colors duration-500">
                    {step.number}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/5 scale-150 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 shadow-sm group-hover:shadow-xl group-hover:border-neutral-200 dark:group-hover:border-neutral-800 transition-all duration-500 flex-1 w-full">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-500">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
