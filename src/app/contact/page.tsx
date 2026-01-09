"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import { faqs } from '@/data/faq';

const contactInfo = [
  {
    icon: <Mail size={24} />,
    title: "Email Us",
    value: "hello@auratech.io",
    description: "We'll respond within 24 hours",
  },
  {
    icon: <Phone size={24} />,
    title: "Call Us",
    value: "+1 (888) AURA-TECH",
    description: "Mon-Fri, 9am-6pm PST",
  },
  {
    icon: <MapPin size={24} />,
    title: "Visit Us",
    value: "648 Innovation Way",
    description: "Neo Valley, CA 90210",
  },
  {
    icon: <Clock size={24} />,
    title: "Hours",
    value: "24/7 Support",
    description: "Premium members only",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center py-24 aurora-bg">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 border border-emerald-500/20">
              <MessageSquare size={14} />
              Get In Touch
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 leading-[1.1]">
              <span className="text-gradient">Let's</span>{" "}
              <span className="text-gradient-purple">Connect</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Have a question, feedback, or just want to say hello? 
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-morphism rounded-[24px] p-6 text-center hover:border-cyan-500/30 transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                  {info.icon}
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-2">{info.title}</h4>
                <p className="font-display text-lg font-bold text-white mb-1">{info.value}</p>
                <p className="text-gray-500 text-xs">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-black mb-8">
                Send Us a <span className="text-gradient">Message</span>
              </h2>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-glow rounded-[32px] p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="text-emerald-400" size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-black mb-4">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full glass hover:bg-white/10 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-morphism rounded-[32px] p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-cyan-500 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-cyan-500 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-cyan-500 outline-none transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-cyan-500 outline-none transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-black mb-8">
                Find <span className="text-gradient-purple">Us</span>
              </h2>
              
              <div className="glass-morphism rounded-[32px] overflow-hidden h-[500px] relative">
                {/* Stylized Map Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10">
                  {/* Grid Pattern */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} />
                  
                  {/* Location Marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center glow-cyan">
                        <MapPin className="text-cyan-400" size={32} />
                      </div>
                      {/* Pulse Ring */}
                      <motion.div
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-cyan-400"
                      />
                    </motion.div>
                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="glass-dark rounded-xl px-4 py-2 text-center">
                        <p className="font-bold text-sm">Aura Tech HQ</p>
                        <p className="text-gray-500 text-xs">Neo Valley, CA</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Roads */}
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-white/10" />
                  <div className="absolute bottom-1/3 left-0 right-0 h-px bg-white/10" />
                  <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/10" />
                  <div className="absolute top-0 bottom-0 right-1/4 w-px bg-white/10" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-black">
              Quick <span className="text-gradient">Answers</span>
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs.slice(0, 4)} />
          </div>
        </div>
      </section>
    </main>
  );
}
