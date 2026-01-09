"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-12 lg:inset-20 z-[101] flex items-center justify-center"
          >
            <div className="w-full max-w-6xl mx-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full glass hover:bg-white/20 transition-all z-10"
              >
                <X size={24} />
              </button>
              
              {/* Video Container */}
              <div className="relative aspect-video rounded-[24px] overflow-hidden glass-strong">
                {/* Video Background with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent" />
                
                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-30">
                  <div 
                    className="absolute inset-0" 
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                      backgroundSize: '60px 60px'
                    }} 
                  />
                </div>
                
                {/* Floating Decorative Elements */}
                <motion.div
                  animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl"
                />
                <motion.div
                  animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white text-black flex items-center justify-center shadow-2xl shadow-white/30 hover:shadow-white/50 transition-all mb-8"
                  >
                    {isPlaying ? (
                      <Pause size={40} />
                    ) : (
                      <Play size={40} className="ml-2" />
                    )}
                  </motion.button>
                  
                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-3xl md:text-5xl font-black text-white text-center mb-4"
                  >
                    <span className="text-gradient">SHANDAR STORE</span> Grand Launch 2026
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-center max-w-lg px-4"
                  >
                    Pakistan ke liye latest aur shandar products. Dekhiye hamara naya collection.
                  </motion.p>
                  
                  {/* Duration Badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 px-4 py-2 rounded-full glass text-sm text-gray-400"
                  >
                    Duration: 45 minutes
                  </motion.div>
                </div>
                
                {/* Video Controls Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                >
                  {/* Progress Bar */}
                  <div className="mb-4 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isPlaying ? "100%" : "0%" }}
                      transition={{ duration: 2700, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:from-cyan-400 group-hover:to-purple-400"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                      <span className="text-sm text-gray-400 font-mono">
                        {isPlaying ? "0:03" : "0:00"} / 45:00
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">1080p HD</span>
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Maximize size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 flex items-center justify-center gap-8 text-gray-500 text-sm"
              >
                <span>🗓️ January 2026</span>
                <span>👁️ 2.4M views</span>
                <span>❤️ 98% liked</span>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
