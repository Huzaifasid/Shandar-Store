"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Eye } from 'lucide-react';
import React from 'react';


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-[32px] glass p-1 transition-all duration-500 hover:border-cyan-500/50 hover:bg-white/[0.04]"
    >
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden rounded-[24px] bg-black/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-10 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-6 right-6">
          <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-cyan-500 text-black border border-cyan-500/20 shadow-lg shadow-cyan-500/20">
            {product.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-all flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 duration-500">
           <div className="bg-white text-black p-4 rounded-full shadow-2xl">
             <Eye size={24} />
           </div>
        </div>
      </Link>
      
      <div className="p-8">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-display text-2xl font-black mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 mb-8 font-light leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Price</span>
            <span className="text-2xl font-black text-[var(--foreground)]">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#00d2ff', color: '#000' }}
            whileTap={{ scale: 0.9 }}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              addItem(product);
            }}

            className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[var(--foreground)] transition-all shadow-xl shadow-transparent hover:shadow-cyan-500/20"
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

