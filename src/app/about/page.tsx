"use client";

import { motion } from 'framer-motion';
import { Award, Target, Heart, Globe, ArrowRight, Calendar } from 'lucide-react';
import TeamCard from '@/components/TeamCard';
import { team } from '@/data/team';
import Link from 'next/link';

const timeline = [
  { year: "2020", title: "Shuruaat", description: "Karachi mein ek chhoti si dukaan se shuru kiya." },
  { year: "2021", title: "Pehla Milestone", description: "1000+ khush customers aur 5-star reviews." },
  { year: "2022", title: "Online Expansion", description: "Website launch aur Pakistan bhar mein delivery shuru ki." },
  { year: "2023", title: "Trust Badha", description: "10,000+ products bechay aur 98% customer satisfaction hasil ki." },
  { year: "2024", title: "New Heights", description: "Multiple cities mein service centers khol diye." },
  { year: "2026", title: "Shandar Future", description: "50,000+ customers aur Pakistan ka most trusted electronics store." },
];

const values = [
  { icon: <Award size={32} />, title: "Quality", description: "Sirf original aur behtareen quality products. Har item ko check karke deliver karte hain." },
  { icon: <Target size={32} />, title: "Fast Delivery", description: "Pakistan bhar mein tez aur secure delivery. Aap ka order time pe pohanchana hamari zimmedari." },
  { icon: <Heart size={32} />, title: "Customer First", description: "Customer ki khushi sabse zaroori. 24/7 support aur easy returns." },
  { icon: <Globe size={32} />, title: "Trust", description: "Honest pricing, no hidden charges. Jo dikhaya wahi milega." },
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
              Hamari Kahani
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 leading-[1.1]">
              <span className="text-gradient">Pakistan Ka</span> <br />
              <span className="text-gradient-purple">Shandar Store</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Ek chhoti si dukaan se shuru karke, aaj hum Pakistan bhar mein trusted electronics store ban gaye hain. 
              Quality aur customer satisfaction hamara pehla usool hai.
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
              <h3 className="font-display text-3xl font-black mb-4">Hamara Mission</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Har Pakistani ko behtareen quality electronics aur latest technology affordable price mein provide karna. 
                Customer ki khushi aur satisfaction hamari pehli priority hai.
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
              <h3 className="font-display text-3xl font-black mb-4">Hamara Vision</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Pakistan ka number 1 electronics store banna jahan har customer ko quality products, 
                fast delivery aur excellent service mile. Har ghar mein technology ka access ho.
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
              Hamara Safar
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black">
              Hamari <span className="text-gradient">Kahani</span>
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
              Hamari <span className="text-gradient-purple">Values</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Woh usool jo hamari har decision mein shamil hain.
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
              Hamari <span className="text-gradient">Team</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                Hamare Saath Kaam Karna Chahte Hain?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Agar aap passionate hain aur technology ki duniya mein kuch karna chahte hain, 
                toh humse zaroor rabta karein.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors"
              >
                Rabta Karein
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
