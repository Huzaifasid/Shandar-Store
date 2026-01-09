"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import CartDrawer from './CartDrawer';
import SearchModal from './SearchModal';
import Link from 'next/link';

const navLinks = [
  { name: 'Products', href: '/#products' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
        <div className={`max-w-7xl mx-auto rounded-full px-8 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled 
            ? 'glass-strong shadow-2xl shadow-cyan-500/10' 
            : 'glass-morphism shadow-2xl shadow-cyan-500/5'
        }`}>
          <div className="flex items-center gap-12">
            <Link href="/" className="font-display text-xl font-black tracking-tighter text-white hover:text-cyan-400 transition-colors">
              SHANDAR STORE
            </Link>
            <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex p-2.5 rounded-full hover:bg-white/10 transition-all"
            >
              <Search size={18} className="text-gray-400 hover:text-white" />
            </motion.button>
            
            {/* Cart Button */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full hover:bg-white/10 transition-all relative group"
            >
              <ShoppingBag size={20} className="text-white group-hover:text-cyan-400" />
              {mounted && getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-black text-[10px] font-black rounded-full flex items-center justify-center"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </motion.button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {/* Shop Now Button */}
            <Link href="/#products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block px-6 py-2.5 rounded-full bg-white text-black text-[10px] font-black tracking-widest uppercase hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                Shop Now
              </motion.button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-6 right-6 mt-2 glass-strong rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-white/10 pt-4 mt-2">
                  <button className="w-full py-3 rounded-2xl bg-white text-black font-bold hover:bg-cyan-400 transition-colors">
                    Pre-Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
