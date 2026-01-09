import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import BackToTop from "@/components/BackToTop";
import NewsletterPopup from "@/components/NewsletterPopup";
import PromoBanner from "@/components/PromoBanner";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Shandar Store | Pakistan's Best Electronics",
  description: "Pakistan ki sabse behtareen quality electronics aur latest gadgets. Trusted online shopping with fast delivery.",
  keywords: "electronics pakistan, gadgets, mobile phones, laptops, online shopping pakistan",
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
        <ThemeProvider>
          <Preloader />
          <PromoBanner />
          <ScrollProgress />
          <Navbar />
          {children}
          <BackToTop />
          <NewsletterPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
