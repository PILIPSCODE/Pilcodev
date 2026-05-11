"use client";

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import * as PricingCard from '@/components/ui/pricing-card';
import { CheckCircle2, Globe, Smartphone, Cpu, Code2, ArrowRight, Monitor } from 'lucide-react';
import Link from 'next/link';

const IconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Cpu,
  Code2,
  Monitor,
};

// Generic features if none are specified
const defaultFeatures = [
  'Konsultasi Perencanaan',
  'Pengembangan & Implementasi',
  'Revisi Terbatas',
  'Source Code & Aset',
  'Dukungan Teknis'
];

export function Services({ services = [] }: { services?: any[] }) {
  return (
    <section id="services" className="py-24 px-6 md:px-24 bg-white dark:bg-black border-y border-neutral-200 dark:border-neutral-900 transition-colors duration-300 relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-light text-black dark:text-white mb-4 tracking-tight">Harga <span className="font-medium italic">Layanan</span></h2>
          <p className="text-neutral-600 dark:text-neutral-400 font-light max-w-2xl mx-auto">
            Kami menghadirkan solusi digital yang bukan cuma menarik secara tampilan, tapi juga dirancang untuk membantu bisnis berkembang, lebih scalable, dan nyaman digunakan oleh pelanggan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 place-items-center md:place-items-stretch">
          {services.map((service, index) => {
            const Icon = service.icon && IconMap[service.icon]
              ? IconMap[service.icon]
              : Code2;

            // Parse the price to make it look nicer if it starts with "Mulai Dari"
            let mainPrice = service.price || "Hubungi Kami";
            let prefix = "";
            if (mainPrice.toLowerCase().startsWith("mulai dari")) {
              prefix = "Mulai Dari";
              mainPrice = mainPrice.replace(/Mulai Dari\s*/i, "");
            }

            return (
              <PricingCard.Card className="w-full h-full flex flex-col" key={service.slug}>
                <PricingCard.Header>
                  <PricingCard.Plan>
                    <PricingCard.PlanName>
                      <Icon className="w-4 h-4" />
                      <span className="text-black dark:text-white font-semibold">{service.title}</span>
                    </PricingCard.PlanName>
                  </PricingCard.Plan>
                  <PricingCard.Price className="flex flex-col items-start gap-0">
                    {prefix && <PricingCard.Period className="pb-0 pt-2">{prefix}</PricingCard.Period>}
                    <PricingCard.MainPrice className={mainPrice.length > 10 ? "text-2xl" : "text-3xl"}>
                      {mainPrice}
                    </PricingCard.MainPrice>
                  </PricingCard.Price>
                  <Link
                    href={`/services/${service.slug}`}
                    className={cn(
                      "w-full font-bold mt-4 px-6 py-3 rounded-xl transition-all duration-300 text-center relative z-20 flex items-center justify-center gap-2",
                      index % 2 === 0
                        ? "bg-black text-white border-2 border-transparent hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-lg shadow-black/10 dark:shadow-white/10"
                        : "border-2 border-black dark:border-white bg-transparent text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    )}
                  >
                    Pelajari Lebih Lanjut
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </PricingCard.Header>

                <PricingCard.Body className="flex-1">
                  <PricingCard.Description>
                    {service.description}
                  </PricingCard.Description>
                  <PricingCard.List>
                    {(service.summaryFeatures || defaultFeatures).map((item: string) => (
                      <PricingCard.ListItem key={item}>
                        <CheckCircle2
                          className="text-black dark:text-white h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </PricingCard.ListItem>
                    ))}
                  </PricingCard.List>
                </PricingCard.Body>
              </PricingCard.Card>
            );
          })}
        </div>
      </div>

      {/* Subtle dotted grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(128,128,128,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(circle at 50% 10%, rgba(0,0,0,1), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 10%, rgba(0,0,0,1), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)'
        }}
      />
    </section>
  );
}
