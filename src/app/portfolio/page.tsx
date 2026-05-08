import portfolio from "@/data/portfolio.json";
import { PortfolioContent } from "./PortfolioContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio | Pilcodev",
  description: "Lihat karya-karya terbaik kami dalam pengembangan website, aplikasi mobile, machine learning, dan otomasi.",
};

export default function PortfolioPage() {
  return <PortfolioContent initialPortfolio={portfolio} />;
}
