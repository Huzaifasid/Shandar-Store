"use client";

import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin: string;
  };
}

export default function TeamCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <div className="glass-morphism rounded-[32px] p-6 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2">
        {/* Avatar */}
        <div className="relative w-full aspect-square rounded-[24px] bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-display font-black text-white/20">
            {member.name.charAt(0)}
          </div>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
            <div className="flex gap-3">
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:bg-cyan-500 hover:text-black transition-all"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Info */}
        <div className="text-center">
          <h4 className="font-display text-xl font-black text-[var(--foreground)] mb-1 group-hover:text-cyan-400 transition-colors">
            {member.name}
          </h4>
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">
            {member.role}
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
