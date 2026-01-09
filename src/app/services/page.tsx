"use client";

import { motion } from 'framer-motion';
import { Headphones, Settings, RefreshCw, Shield, Check, ArrowRight, Zap, Clock, Star } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <Headphones size={32} />,
    title: "Premium Support",
    description: "24/7 dedicated support from tech experts who understand your needs.",
    features: ["Priority queue access", "Screen sharing assistance", "Direct engineer contact", "Multi-language support"],
    color: "cyan",
  },
  {
    icon: <Settings size={32} />,
    title: "Device Setup",
    description: "Professional setup and data migration for your new Shandar Store device.",
    features: ["Complete data transfer", "App installation", "Personalized settings", "Tutorial walkthrough"],
    color: "purple",
  },
  {
    icon: <RefreshCw size={32} />,
    title: "Trade-In Program",
    description: "Get credit towards your next purchase by trading in your old devices.",
    features: ["Fair market value", "Free shipping kit", "Instant credit", "Any brand accepted"],
    color: "emerald",
  },
  {
    icon: <Shield size={32} />,
    title: "Extended Warranty",
    description: "Extend your coverage beyond the standard warranty period.",
    features: ["Accidental damage", "Battery replacement", "Priority repairs", "Loaner device"],
    color: "yellow",
  },
];

const pricingPlans = [
  {
    name: "Essential",
    price: "Free",
    period: "",
    description: "For casual users",
    features: [
      "Standard support (9-5)",
      "Online knowledge base",
      "Community forums",
      "1-year warranty",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    description: "For power users",
    features: [
      "24/7 priority support",
      "Screen sharing assistance",
      "Extended 3-year warranty",
      "10% off accessories",
      "Early access to products",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For businesses",
    features: [
      "Dedicated account manager",
      "On-site support",
      "Volume discounts",
      "Custom solutions",
      "SLA guarantee",
      "API access",
    ],
    highlighted: false,
  },
];

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-24 aurora-bg">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase text-purple-400 border border-purple-500/20">
              Our Services
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 leading-[1.1]">
              <span className="text-gradient-purple">Premium</span>{" "}
              <span className="text-gradient">Care</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Exceptional support and services to ensure your Shandar Store experience 
              is nothing short of extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-morphism rounded-[32px] p-10 hover:border-cyan-500/30 transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-${service.color}-500/20 flex items-center justify-center mb-6 text-${service.color}-400 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="font-display text-2xl font-black mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-500">
                      <Check size={16} className="text-cyan-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Getting premium support has never been easier.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", icon: <Zap size={24} />, title: "Choose Your Plan", desc: "Select the service level that fits your needs and budget." },
              { step: "02", icon: <Clock size={24} />, title: "Get Instant Access", desc: "Your premium benefits activate immediately after signup." },
              { step: "03", icon: <Star size={24} />, title: "Enjoy Peace of Mind", desc: "Relax knowing expert support is just a click away." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="text-[120px] font-display font-black text-white/5 absolute -top-4 left-1/2 -translate-x-1/2">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full glass-glow flex items-center justify-center mx-auto mb-6 text-cyan-400">
                    {item.icon}
                  </div>
                  <h4 className="font-display text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase block mb-4">
              Pricing
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4">
              Simple <span className="text-gradient-purple">Plans</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Choose the perfect plan for your needs. No hidden fees, ever.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-[32px] p-8 relative overflow-hidden ${
                  plan.highlighted 
                    ? 'glass-glow border-cyan-500/30 scale-105' 
                    : 'glass-morphism'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-xs font-bold uppercase tracking-widest py-2 text-center">
                    Most Popular
                  </div>
                )}
                <div className={plan.highlighted ? 'pt-8' : ''}>
                  <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="font-display text-5xl font-black">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <Check size={16} className="text-cyan-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
                    plan.highlighted 
                      ? 'bg-white text-black hover:bg-cyan-400' 
                      : 'glass hover:bg-white/10'
                  }`}>
                    Get Started
                  </button>
                </div>
              </motion.div>
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
            className="glass-strong rounded-[48px] p-12 md:p-16 text-center"
          >
            <h2 className="font-display text-3xl md:text-5xl font-black mb-6">
              Have Questions?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Our team is ready to help you choose the right service for your needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors"
            >
              Contact Sales
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
