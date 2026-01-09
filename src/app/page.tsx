"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Shield, Mail, MapPin, Users, ArrowRight, Sparkles, Award, Rocket, Star, Play } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import StatsCounter from '@/components/StatsCounter';
import TestimonialCard from '@/components/TestimonialCard';
import FAQAccordion from '@/components/FAQAccordion';
import TeamCard from '@/components/TeamCard';
import VideoShowcase from '@/components/VideoShowcase';
import PartnersSection from '@/components/PartnersSection';
import VideoModal from '@/components/VideoModal';
import { testimonials, stats } from '@/data/testimonials';
import { team } from '@/data/team';
import { faqs } from '@/data/faq';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories = ['All', 'Computing', 'Mobile', 'Audio', 'Gaming'];

  return (
    <main className="relative overflow-hidden">
      {/* Video Modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
      
      {/* Floating Particles Background */}
      <div className="particles fixed inset-0 pointer-events-none z-0">
        <div className="particle" style={{ left: '10%' }} />
        <div className="particle" style={{ left: '30%' }} />
        <div className="particle" style={{ left: '50%' }} />
        <div className="particle" style={{ left: '70%' }} />
        <div className="particle" style={{ left: '90%' }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-6 mt-[-80px] aurora-bg">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[180px]" />
        </div>
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 border border-cyan-500/20"
            >
              <Sparkles size={14} className="animate-pulse" />
              Future of Technology
              <Sparkles size={14} className="animate-pulse" />
            </motion.div>
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 leading-[1.1]">
              <span className="text-gradient">Pakistan's Most</span> <br />
              <span className="text-gradient-rainbow">Shandar Collection</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
              Pakistan ki sabse behtareen quality aur latest technology. 
              Apne sapnon ka gadget yahan se hasil karein.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors inline-flex items-center gap-2 justify-center glow-cyan"
              >
                Explore Collection
                <ArrowRight size={18} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-colors inline-flex items-center gap-2 justify-center group"
              >
                <Play size={18} className="group-hover:text-cyan-400 transition-colors" />
                Watch Keynote
              </motion.button>
            </div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0, 1, 0], y: [0, 10, 10] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-cyan-400 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Stats Counter */}
      <StatsCounter stats={stats} />

      {/* Featured Products */}
      <section id="products" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase block mb-4">
                Premium Selection
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-black mb-4">The Collection</h2>
              <p className="text-gray-400 max-w-md">Precision engineered, aesthetically supreme gadgets for the next generation.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-2 flex-wrap"
            >
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full glass text-sm transition-all",
                    activeCategory === cat 
                      ? "bg-cyan-500 text-black border-cyan-500 font-bold" 
                      : "hover:border-cyan-500"
                  )}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-3xl glass animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button className="px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-all inline-flex items-center gap-2 group">
              View All Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Advance Features / Stats */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 text-xs font-bold tracking-[0.3em] uppercase block mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              Advanced <span className="text-gradient-purple">Features</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Cpu className="text-cyan-400" size={32} />, title: "Neural Link", desc: "Proprietary processing for zero-latency interactions. Experience the future of human-device connection." },
              { icon: <Zap className="text-purple-400" size={32} />, title: "Hyper Charge", desc: "Power that lasts weeks, charges in mere seconds. Revolutionary battery technology at your fingertips." },
              { icon: <Shield className="text-emerald-400" size={32} />, title: "Aegis Privacy", desc: "Military-grade encryption for your digital life. Your data stays yours, always protected." },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-morphism rounded-[32px] p-8 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="p-4 rounded-2xl glass shrink-0 h-fit w-fit mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="font-display text-2xl font-bold mb-4 group-hover:text-gradient transition-all">{feature.title}</h4>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <VideoShowcase />

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase text-yellow-400 border border-yellow-500/20 mb-6">
              <Star size={14} fill="currentColor" />
              Customer Love
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              What People <span className="text-gradient-gold">Say</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Join thousands of satisfied customers who've elevated their tech experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
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
              The Visionaries
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              The brilliant minds behind Aura Tech's revolutionary products.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion faqs={faqs} />

      {/* CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10" />
          <div className="absolute inset-0 bg-[var(--background)]/80" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 border border-cyan-500/20 mb-6"
              >
                <Rocket size={14} />
                Limited Time Offer
              </motion.div>
              <h2 className="font-display text-4xl md:text-7xl font-black mb-6">
                Ready to <span className="text-gradient-rainbow">Transform</span><br />Your Tech?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                Join the elite circle of Aura Tech pioneers. Get exclusive early access to new products and special member pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full bg-white text-black font-black text-sm tracking-widest uppercase hover:bg-cyan-400 transition-colors inline-flex items-center gap-2 justify-center glow-cyan"
                >
                  Get Started Now
                  <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full glass font-black text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-24 bg-white/[0.01]">
        <div className="container mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-[40px] overflow-hidden grid md:grid-cols-2"
          >
            <div className="p-12 bg-gradient-to-br from-cyan-500/10 to-transparent">
              <h3 className="font-display text-3xl font-black mb-6">Stay Ahead</h3>
              <p className="text-gray-400 mb-8">Join the inner circle and be the first to experience our upcoming releases.</p>
              <div className="space-y-4 text-sm text-gray-500">
                <div className="flex items-center gap-3"><Mail size={16} className="text-cyan-400" /> newsletter@auratech.io</div>
                <div className="flex items-center gap-3"><MapPin size={16} className="text-cyan-400" /> Silicon Valley, CA</div>
                <div className="flex items-center gap-3"><Users size={16} className="text-cyan-400" /> 2,400+ Pioneers</div>
              </div>
            </div>
            <form className="p-12 space-y-4">
              <input type="text" placeholder="Full Name" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-cyan-500 outline-none transition-all" />
              <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-cyan-500 outline-none transition-all" />
              <textarea placeholder="Your Vision" rows={4} className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-cyan-500 outline-none transition-all" />
              <button className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-cyan-400 transition-colors shadow-xl shadow-cyan-500/10">
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-24 border-t border-[var(--glass-border)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 text-sm text-gray-500">
            <div className="md:col-span-2 space-y-6">
              <h2 className="font-display text-[var(--foreground)] text-3xl font-black tracking-tighter">SHANDAR STORE</h2>
              <p className="max-w-sm">Pakistan mein sabse trusted aur quality electronics store. 2024 se aap ki khidmat mein.</p>
              <div className="flex gap-4">
                {['X', 'In', 'Ig', 'Yt'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[var(--foreground)] font-bold mb-6 uppercase tracking-widest text-xs">Products</h5>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Quantum Phone</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Zenith Laptop</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Sonic Buds</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">All Products</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[var(--foreground)] font-bold mb-6 uppercase tracking-widest text-xs">Company</h5>
              <ul className="space-y-3">
                <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Press</a></li>
                <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[var(--foreground)] font-bold mb-6 uppercase tracking-widest text-xs">Support</h5>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Warranty</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Returns</a></li>
                <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest uppercase text-gray-600">
            <span>&copy; 2026 Shandar Store Pakistan. Aap ki pasand, hamari zimmedari.</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
