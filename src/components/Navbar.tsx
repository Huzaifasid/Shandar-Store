"use client";

import { motion } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import CartDrawer from './CartDrawer';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto glass-morphism rounded-full px-8 py-4 flex items-center justify-between shadow-2xl shadow-cyan-500/5">
          <div className="flex items-center gap-12">
            <a href="/" className="font-display text-xl font-black tracking-tighter text-white hover:text-cyan-400 transition-colors">
              AURA TECH
            </a>
            <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
              <a href="#products" className="hover:text-white transition-colors">Collection</a>
              <a href="#feedback" className="hover:text-white transition-colors">Connect</a>
              <a href="#about" className="hover:text-white transition-colors">Inside</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full hover:bg-white/10 transition-all relative group"
            >
              <ShoppingBag size={20} className="text-white group-hover:text-cyan-400" />
              {mounted && getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-black text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button className="hidden md:block px-6 py-2.5 rounded-full bg-white text-black text-[10px] font-black tracking-widest uppercase hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
              Pre-Order
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

