"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Shield, Mail, MapPin, Users } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { cn } from '@/lib/utils';

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


  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center p-6 mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        </div>
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 border border-cyan-500/20">
              Future of Technology
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 leading-[1.1] text-gradient">
              Experience the <br /> Aura of Innovation
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
              Where premium design meets unparalleled performance. 
              Discover a new standard of luxury electronics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors">
                Explore Collection
              </button>
              <button className="px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-colors">
                Watch Keynote
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-black mb-4">The Collection</h2>
              <p className="text-gray-400 max-w-md">Precision engineered, aesthetically supreme gadgets for the next generation.</p>
            </div>
            <div className="flex gap-2">
              {['All', 'Computing', 'Mobile', 'Audio'].map((cat) => (
                <button key={cat} className="px-5 py-2 rounded-full glass text-sm hover:border-cyan-500 transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-3xl glass animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Advance Features / Stats */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          {[
            { icon: <Cpu className="text-cyan-400" />, title: "Neural Link", desc: "Proprietary processing for zero-latency interactions." },
            { icon: <Zap className="text-purple-400" />, title: "Hyper Charge", desc: "Power that lasts weeks, charges in mere seconds." },
            { icon: <Shield className="text-emerald-400" />, title: "Aegis Privacy", desc: "Military-grade encryption for your digital life." },
          ].map((feature, i) => (
            <div key={i} className="flex gap-6">
              <div className="p-4 rounded-2xl glass shrink-0 h-fit">{feature.icon}</div>
              <div>
                <h4 className="font-display text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-24 bg-white/[0.01]">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="glass-morphism rounded-[40px] overflow-hidden grid md:grid-cols-2">
            <div className="p-12 bg-gradient-to-br from-cyan-500/10 to-transparent">
              <h3 className="font-display text-3xl font-black mb-6">Stay Ahead</h3>
              <p className="text-gray-400 mb-8">Join the inner circle and be the first to experience our upcoming releases.</p>
              <div className="space-y-4 text-sm text-gray-500">
                <div className="flex items-center gap-3"><Mail size={16} /> newsletter@auratech.io</div>
                <div className="flex items-center gap-3"><MapPin size={16} /> Silicon Valley, CA</div>
                <div className="flex items-center gap-3"><Users size={16} /> 2,400+ Pioneers</div>
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-500">
          <div className="space-y-6">
            <h2 className="font-display text-white text-2xl font-black tracking-tighter">AURA TECH</h2>
            <p>Setting the gold standard for high-performance minimalist technology since 2024.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Partners</h5>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Apple Ecosystem</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">NVIDIA Render Core</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Tesla Auto Link</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">HQ</h5>
            <p>648 Innovation Way<br />Neo Valley, CA 90210<br />United States</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Legal</h5>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Ethics Board</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Warranty</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-12 mt-12 border-t border-white/5 text-center text-[10px] tracking-widest uppercase">
          &copy; 2026 Aura Tech Industries. Designed for the Future.
        </div>
      </footer>
    </main>
  );
}
