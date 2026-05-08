import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pilcodev | Layanan Pengembangan Software Premium",
  description: "Layanan pengembangan software minimalis dan berperforma tinggi, termasuk solusi web, mobile, dan machine learning.",
};

import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${outfit.className} bg-white dark:bg-black text-black dark:text-white antialiased transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Header />
            {children}
            <Contact />
            <Footer />
            <WhatsAppFloatingButton />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
