import portfolio from "@/data/portfolio.json";
import { PortfolioContent } from "./PortfolioContent";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Portofolio | Pilcodev",
  description: "Lihat karya-karya terbaik kami dalam pengembangan website, aplikasi mobile, machine learning, dan otomasi.",
};

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black" />}>
      <PortfolioContent initialPortfolio={portfolio} />
    </Suspense>
  );
}
