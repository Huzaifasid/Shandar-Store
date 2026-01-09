import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import BackToTop from "@/components/BackToTop";
import NewsletterPopup from "@/components/NewsletterPopup";
import PromoBanner from "@/components/PromoBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Aura Tech | Premium Gadget Showcase",
  description: "Experience the aura of innovation with our curated selection of high-end gadgets.",
  keywords: "technology, gadgets, premium, electronics, innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-[#050608] text-[#f4f4f4] font-sans antialiased selection:bg-cyan-500/30 pt-[80px]",
          inter.variable,
          outfit.variable
        )}
      >
        <Preloader />
        <PromoBanner />
        <ScrollProgress />
        <Navbar />
        {children}
        <BackToTop />
        <NewsletterPopup />
      </body>
    </html>
  );
}
