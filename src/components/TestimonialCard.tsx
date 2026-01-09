"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  company: string;
}

export default function TestimonialCard({ testimonial, index = 0 }: { testimonial: Testimonial; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="glass-morphism rounded-[32px] p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-cyan-500/20">
        <Quote size={48} />
      </div>
      
      <div className="relative z-10">
        {/* Rating */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}
            />
          ))}
        </div>
        
        {/* Content */}
        <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
          "{testimonial.content}"
        </p>
        
        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-xl font-bold text-white">
              {testimonial.name.charAt(0)}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
            <p className="text-gray-500 text-sm">{testimonial.role} • {testimonial.company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
