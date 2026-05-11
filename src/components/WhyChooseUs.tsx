"use client";

import { ShieldCheck, Zap, HeartHandshake, Award } from "lucide-react";

const features = [
  {
    title: "Kualitas yang Nggak Asal Jadi",
    description:
      "Setiap project kami kerjakan dengan detail dan standar terbaik, jadi hasilnya bukan cuma keren dilihat tapi juga nyaman digunakan.",
    icon: ShieldCheck,
  },
  {
    title: "Cepat & Responsif",
    description:
      "Website dan aplikasi kami dioptimalkan agar loading lebih cepat, ringan, dan tetap nyaman di semua perangkat.",
    icon: Zap,
  },
  {
    title: "Siap Dampingi Setelah Launch",
    description:
      "Kami nggak cuma selesai saat project jadi. Kalau ada kendala atau pengembangan lanjutan, kami siap bantu.",
    icon: HeartHandshake,
  },
  {
    title: "Fokus ke Hasil Bisnis",
    description:
      "Tujuan kami bukan sekadar bikin aplikasi atau website, tapi membantu bisnis Anda berkembang lewat solusi digital yang tepat.",
    icon: Award,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 px-6 md:px-24 bg-white dark:bg-black transition-colors duration-300 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Sticky Title Section */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <h2 className="text-4xl md:text-6xl font-light text-black dark:text-white mb-6 tracking-tight leading-tight">
              Kenapa Memilih <span className="font-medium italic">Kami</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Kami percaya teknologi bukan cuma soal tampilan keren, tapi juga soal hasil yang benar-benar terasa untuk bisnis Anda.
            </p>

            <div className="mt-12 hidden lg:block">
              <div className="w-24 h-1 bg-black dark:bg-white" />
            </div>
          </div>

          {/* Features List Section (Non-Card) */}
          <div className="lg:w-2/3 space-y-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group flex gap-8 items-start pb-12 border-b border-neutral-100 dark:border-neutral-900 last:border-0"
              >
                <div className="shrink-0 mt-1">
                  <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-500">
                    <feature.icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-xl">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-100 dark:bg-white/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
    </section>
  );
}
