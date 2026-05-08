"use client";

import dynamic from "next/dynamic";

const EtherealBeamsHero = dynamic(
  () => import("./ui/ethereal-beams-hero"),
  { ssr: false }
);

export function Hero() {
  return <EtherealBeamsHero />;
}
