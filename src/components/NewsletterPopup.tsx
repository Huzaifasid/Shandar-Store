"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Mail } from 'lucide-react';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds if user hasn't seen it
    const hasSeenPopup = localStorage.getItem('aura-newsletter-seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('aura-newsletter-seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    localStorage.setItem('aura-newsletter-seen', 'true');
    setTimeout(() => setIsOpen(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg"
          >
            <div className="glass-strong rounded-[32px] p-8 md:p-10 relative overflow-hidden mx-4">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] -z-10" />
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
              
              {!isSubmitted ? (
                <>
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                    <Sparkles size={32} className="text-white" />
                  </div>
                  
                  {/* Content */}
                  <h2 className="font-display text-3xl font-black text-center mb-3">
                    Get <span className="text-gradient">15% Off</span>
                  </h2>
                  <p className="text-gray-400 text-center mb-8">
                    Join our newsletter and get exclusive access to new products and special member pricing.
                  </p>
                  
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pl-12 focus:border-cyan-500 outline-none transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:opacity-90 transition-all"
                    >
                      Claim My 15% Off
                    </button>
                  </form>
                  
                  <p className="text-center text-gray-600 text-xs mt-6">
                    By subscribing, you agree to our Privacy Policy
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <Sparkles size={32} className="text-emerald-400" />
                    </motion.div>
                  </div>
                  <h3 className="font-display text-2xl font-black mb-2">You're In!</h3>
                  <p className="text-gray-400">Check your email for your discount code.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
