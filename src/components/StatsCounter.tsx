"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    
    const interval = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(interval);
  }, [isInView, value]);
  
  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats }: { stats: StatItem[] }) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="glass-glow rounded-3xl p-8 h-full hover:border-cyan-500/50 transition-all duration-500 hover:scale-105">
                <div className="font-display text-5xl md:text-6xl font-black text-gradient mb-3">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-widest">
                  {stat.label}
                </h4>
                <p className="text-gray-500 text-sm">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
