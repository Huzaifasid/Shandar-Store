"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { products } from '@/data/items';
import Image from 'next/image';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(products);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl z-[101] px-4"
          >
            <div className="glass-strong rounded-[32px] overflow-hidden">
              {/* Search Input */}
              <div className="p-6 border-b border-white/10">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Products search karein..."
                    className="w-full bg-[var(--background)]/40 border border-[var(--glass-border)] rounded-2xl p-4 pl-12 pr-12 focus:border-cyan-500 outline-none transition-all text-[var(--foreground)] placeholder:text-gray-500"
                  />
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-6">
                {searchResults.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-gray-500 text-sm mb-4">
                      {searchResults.length} products mil gaye
                    </p>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/5 transition-all group"
                      >
                        <div className="w-16 h-16 bg-white/5 rounded-xl overflow-hidden shrink-0 relative">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                            {product.name}
                          </h4>
                          <p className="text-gray-500 text-sm truncate">{product.description}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-cyan-400 font-bold">${product.price.toLocaleString()}</span>
                            <span className="text-xs text-gray-600 px-2 py-0.5 rounded-full bg-white/5">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search size={48} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400 mb-2">Koi product nahi mila</p>
                    <p className="text-gray-600 text-sm">Koi aur keyword try karein</p>
                  </div>
                )}
              </div>

              {/* Quick Links */}
              {searchQuery === '' && (
                <div className="p-6 border-t border-white/10">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Popular Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {['Computing', 'Mobile', 'Audio', 'Gaming', 'Wearable'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSearchQuery(cat)}
                        className="px-4 py-2 rounded-full glass text-sm hover:bg-cyan-500/20 hover:text-cyan-400 transition-all"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
