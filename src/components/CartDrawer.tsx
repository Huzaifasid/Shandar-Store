"use client";

import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0b10] border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-black flex items-center gap-3">
                <ShoppingBag className="text-cyan-400" />
                YOUR CART
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <ShoppingBag size={64} />
                  <p className="text-lg">Your cart is feeling a bit light.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-24 h-24 bg-white/5 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-3" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors uppercase text-sm tracking-widest">
                          {item.name}
                        </h4>
                        <p className="text-cyan-400 font-display font-black text-lg mt-1">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center glass rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 glass-morphism border-t border-white/10 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">Subtotal</span>
                  <span className="text-3xl font-display font-black text-white">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <a 
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full py-4 rounded-2xl bg-white text-black font-bold text-sm tracking-[0.2em] uppercase hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10 text-center"
                >
                  Secure Checkout
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
