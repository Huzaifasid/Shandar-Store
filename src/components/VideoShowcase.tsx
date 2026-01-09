"use client";

import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useState, useRef } from 'react';

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase text-purple-400 border border-purple-500/20 mb-6"
          >
            See It In Action
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-black mb-4"
          >
            Experience the <span className="text-gradient-purple">Innovation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-lg mx-auto"
          >
            Watch how Aura Tech is revolutionizing the future of technology.
          </motion.p>
        </div>
        
        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative aspect-video rounded-[32px] overflow-hidden glass-strong group">
            {/* Video Placeholder with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center cursor-pointer shadow-2xl shadow-white/20 hover:shadow-white/40 transition-all mb-4"
                  >
                    {isPlaying ? <Pause size={36} /> : <Play size={36} className="ml-2" />}
                  </motion.div>
                  <p className="text-white/60 text-sm font-medium">
                    {isPlaying ? 'Playing Demo' : 'Click to Play'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }} />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-2xl blur-sm"
            />
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-sm"
            />
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                  <span className="text-sm text-gray-400">0:00 / 2:30</span>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Maximize size={20} />
                </button>
              </div>
              {/* Progress Bar */}
              <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: 150, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
