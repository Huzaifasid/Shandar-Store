"use client";

import { motion } from 'framer-motion';
import { Award, Target, Heart, Globe, ArrowRight, Calendar } from 'lucide-react';
import TeamCard from '@/components/TeamCard';
import { team } from '@/data/team';
import Link from 'next/link';

const timeline = [
  { year: "2019", title: "The Vision", description: "Founded in a garage with a dream to revolutionize consumer electronics." },
  { year: "2020", title: "First Product", description: "Launched Quantum Phone X1, selling out in 48 hours." },
  { year: "2021", title: "Global Expansion", description: "Expanded to 50+ countries with dedicated R&D centers." },
  { year: "2022", title: "Neural Link Tech", description: "Patented our revolutionary Neural Link processing technology." },
  { year: "2023", title: "Sustainability Pledge", description: "Achieved carbon neutrality across all operations." },
  { year: "2024", title: "The Future", description: "Serving 50,000+ customers with 120+ product variants." },
];

const values = [
  { icon: <Award size={32} />, title: "Excellence", description: "We never settle for good enough. Every detail matters in our pursuit of perfection." },
  { icon: <Target size={32} />, title: "Innovation", description: "Pushing boundaries and challenging conventions to create the impossible." },
  { icon: <Heart size={32} />, title: "Customer First", description: "Every decision starts and ends with how it impacts our customers." },
  { icon: <Globe size={32} />, title: "Sustainability", description: "Building the future responsibly with eco-friendly practices and materials." },
];

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-24 aurora-bg">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 border border-cyan-500/20">
              Our Story
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 leading-[1.1]">
              <span className="text-gradient">We Build the</span> <br />
              <span className="text-gradient-purple">Future</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              From a small garage to a global phenomenon, Aura Tech is on a mission to redefine 
              how humans interact with technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-[32px] p-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                <Target className="text-cyan-400" size={32} />
              </div>
              <h3 className="font-display text-3xl font-black mb-4">Our Mission</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                To democratize premium technology, making cutting-edge innovation accessible to everyone while 
                maintaining uncompromising quality and design excellence.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-[32px] p-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Globe className="text-purple-400" size={32} />
              </div>
              <h3 className="font-display text-3xl font-black mb-4">Our Vision</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                A world where technology seamlessly enhances human potential, where every device is a work 
                of art, and where innovation serves humanity's greatest aspirations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 border border-cyan-500/20 mb-6">
              <Calendar size={14} />
              Our Journey
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black">
              The <span className="text-gradient">Timeline</span>
            </h2>
          </motion.div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500 hidden md:block" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-morphism rounded-2xl p-6 inline-block hover:border-cyan-500/30 transition-all">
                    <span className="text-cyan-400 text-sm font-bold">{item.year}</span>
                    <h4 className="font-display text-xl font-bold mt-2 mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full bg-cyan-500 shrink-0 glow-cyan" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              Our <span className="text-gradient-purple">Values</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              The principles that guide every decision we make.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-morphism rounded-[32px] p-8 text-center hover:border-cyan-500/30 transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-6 text-cyan-400">
                  {value.icon}
                </div>
                <h4 className="font-display text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-gray-500 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase block mb-4">
              Leadership
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-[48px] p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-black mb-6">
                Want to Join Our Team?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                We're always looking for passionate individuals who want to shape the future of technology.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors"
              >
                Get in Touch
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
