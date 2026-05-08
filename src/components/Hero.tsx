"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Loading skeleton that matches the hero layout
function HeroSkeleton() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Animated gradient background as placeholder */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full animate-pulse"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

const EtherealBeamsHero = dynamic(
  () => import("./ui/ethereal-beams-hero"),
  {
    ssr: false,
    loading: () => <HeroSkeleton />,
  }
);

export function Hero() {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <EtherealBeamsHero />
    </Suspense>
  );
}
