"use client";

import { use } from "react";
import { products } from "@/data/items";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { ChevronLeft, ShoppingCart, Zap, Box, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === parseInt(resolvedParams.id));
  const addItem = useCartStore((state) => state.addItem);

  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050608] pb-24">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 pt-32 relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
        >
          <div className="p-2 rounded-full glass group-hover:bg-white/10">
            <ChevronLeft size={20} />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase">Back to Collection</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Display */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-[48px] glass p-12 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,210,255,0.3)]" 
              />
            </motion.div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} />
                  <span className="text-gray-500 text-[10px] font-bold ml-2">4.8 (124 REVIEWS)</span>
                </div>
              </div>
              <h1 className="font-display text-6xl md:text-8xl font-black text-white leading-tight uppercase tracking-tighter italic">
                {product.name}
              </h1>
              <p className="text-gray-400 text-xl font-light mt-8 leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            <div className="flex items-end gap-2">
               <span className="text-6xl font-display font-black text-white italic">
                 ${product.price.toLocaleString()}
               </span>
               <span className="text-gray-600 text-xs font-bold mb-3 uppercase tracking-widest">Tax Included</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => addItem(product)}
                className="col-span-1 py-5 rounded-3xl bg-white text-black font-black text-sm tracking-widest uppercase hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-cyan-500/20"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button className="col-span-1 py-5 rounded-3xl glass text-white font-black text-sm tracking-widest uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Zap size={18} /> Buy Now
              </button>
            </div>

            <div className="pt-10 border-t border-white/5 grid grid-cols-3 gap-8">
               <div className="space-y-2">
                 <Box className="text-cyan-400" size={24} />
                 <h5 className="text-white font-bold text-xs uppercase tracking-widest">Global Delivery</h5>
                 <p className="text-gray-500 text-[10px] leading-relaxed">Secure express shipping to 120+ countries.</p>
               </div>
               <div className="space-y-2">
                 <ShieldCheck className="text-cyan-400" size={24} />
                 <h5 className="text-white font-bold text-xs uppercase tracking-widest">3 Year Warranty</h5>
                 <p className="text-gray-500 text-[10px] leading-relaxed">Full coverage on all hardware components.</p>
               </div>
               <div className="space-y-2">
                 <Star className="text-cyan-400" size={24} />
                 <h5 className="text-white font-bold text-xs uppercase tracking-widest">Premium Care</h5>
                 <p className="text-gray-500 text-[10px] leading-relaxed">24/7 dedicated support for elite customers.</p>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-40">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-cyan-500 text-[10px] font-black tracking-[0.3em] uppercase block mb-4">You might also like</span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Related Ecosystem</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
