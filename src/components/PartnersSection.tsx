"use client";

import { motion } from 'framer-motion';

const partners = [
  { name: "Apple", logo: "🍎" },
  { name: "NVIDIA", logo: "💚" },
  { name: "Tesla", logo: "🚗" },
  { name: "Sony", logo: "🎮" },
  { name: "Samsung", logo: "📱" },
  { name: "Microsoft", logo: "🪟" },
  { name: "Google", logo: "🔍" },
  { name: "Amazon", logo: "📦" },
];

export default function PartnersSection() {
  return (
    <section className="py-20 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-500 text-sm font-bold tracking-[0.2em] uppercase"
        >
          Trusted by Industry Leaders
        </motion.p>
      </div>
      
      {/* Scrolling Logos */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050608] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050608] to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 items-center"
        >
          {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="flex items-center gap-3 shrink-0 text-gray-500 hover:text-white transition-colors group cursor-pointer"
            >
              <span className="text-4xl grayscale group-hover:grayscale-0 transition-all">
                {partner.logo}
              </span>
              <span className="font-display text-2xl font-bold tracking-tight whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
