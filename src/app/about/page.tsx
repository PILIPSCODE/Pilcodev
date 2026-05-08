import { WhoWeAre } from "@/components/WhoWeAre";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | Pilcodev",
  description: "Pelajari lebih lanjut tentang Pilcodev, agensi pengembangan software premium.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <WhoWeAre />
    </main>
  );
}


