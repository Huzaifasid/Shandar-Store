"use client";

import { use, useState } from "react";
import { products } from "@/data/items";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { ChevronLeft, ShoppingCart, Zap, Box, ShieldCheck, Star, Heart, Share2, Minus, Plus, Check, Truck, RotateCcw, Headphones } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'specs', label: 'Specifications' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'shipping', label: 'Shipping' },
];

const fakeReviews = [
  { id: 1, name: "Alex Thompson", rating: 5, date: "2 days ago", comment: "Absolutely incredible product! The build quality is unmatched and the performance exceeds all expectations." },
  { id: 2, name: "Sarah Chen", rating: 5, date: "1 week ago", comment: "Best purchase I've made this year. The attention to detail is remarkable." },
  { id: 3, name: "Mike Rodriguez", rating: 4, date: "2 weeks ago", comment: "Great product overall. Shipping was fast and customer service was excellent." },
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === parseInt(resolvedParams.id));
  const addItem = useCartStore((state) => state.addItem);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) notFound();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Generate fake gallery images (same image repeated for demo)
  const galleryImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24 transition-colors duration-300">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 pt-12 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-[var(--foreground)] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-cyan-400">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-[48px] glass p-8 flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full h-full"
              >
                <Image 
                  src={galleryImages[selectedImage]} 
                  alt={product.name} 
                  fill 
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,210,255,0.3)]" 
                />
              </motion.div>
              
              {/* Wishlist & Share Buttons */}
              <div className="absolute top-6 right-6 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full transition-all ${isWishlisted ? 'bg-rose-500 text-white' : 'glass hover:bg-white/10'}`}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full glass hover:bg-white/10 transition-all"
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
              
              {/* Sale Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider">
                  Best Seller
                </span>
              </div>
            </motion.div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-4">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-1 aspect-square rounded-2xl overflow-hidden transition-all ${
                    selectedImage === i ? 'ring-2 ring-cyan-500' : 'glass opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image src={img} alt="" fill className="object-contain p-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
                  ))}
                  <span className="text-gray-500 text-xs font-bold ml-2">4.8 (124 REVIEWS)</span>
                </div>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-black text-[var(--foreground)] leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-400 text-lg font-light mt-6 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price & Quantity */}
            <div className="glass-morphism rounded-3xl p-6 space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-gray-500 text-sm">Price</span>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-display font-black text-[var(--foreground)]">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600 line-through text-lg mb-1">
                      ${Math.floor(product.price * 1.2).toLocaleString()}
                    </span>
                    <span className="text-emerald-400 text-sm font-bold mb-1">Save 20%</span>
                  </div>
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm">Qty</span>
                  <div className="flex items-center glass rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:text-cyan-400 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:text-cyan-400 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`py-4 rounded-2xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all ${
                    addedToCart 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white text-black hover:bg-cyan-400 shadow-2xl shadow-cyan-500/20'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} />
                      Added!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add to Cart
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-4 rounded-2xl glass text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <Zap size={18} />
                  Buy Now
                </motion.button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Truck size={20} />, title: "Free Shipping", desc: "Orders over $500" },
                { icon: <RotateCcw size={20} />, title: "30-Day Returns", desc: "Hassle-free" },
                { icon: <Headphones size={20} />, title: "24/7 Support", desc: "Expert help" },
              ].map((badge, i) => (
                <div key={i} className="glass rounded-2xl p-4 text-center">
                  <div className="text-cyan-400 mx-auto mb-2">{badge.icon}</div>
                  <h5 className="text-[var(--foreground)] font-bold text-xs uppercase tracking-wider">{badge.title}</h5>
                  <p className="text-gray-500 text-[10px]">{badge.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mt-24">
          {/* Tab Headers */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-black'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-morphism rounded-[32px] p-8 md:p-12"
            >
              {activeTab === 'description' && (
                <div className="prose prose-invert max-w-none">
                  <h3 className="font-display text-2xl font-bold mb-4">About This Product</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {product.description} Crafted with precision engineering and premium materials, 
                    this product represents the pinnacle of modern technology. Every detail has been 
                    carefully considered to deliver an unmatched user experience.
                  </p>
                  <h4 className="font-bold text-lg mb-3">Key Features</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-cyan-400" />
                      Premium build quality with aerospace-grade materials
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-cyan-400" />
                      Advanced Neural Link technology for seamless integration
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-cyan-400" />
                      Industry-leading performance and efficiency
                    </li>
                    <li className="flex items-center gap-3">
                      <Check size={16} className="text-cyan-400" />
                      Eco-friendly packaging and sustainable manufacturing
                    </li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'specs' && (
                <div>
                  <h3 className="font-display text-2xl font-bold mb-6">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Model", value: product.name },
                      { label: "Category", value: product.category },
                      { label: "Dimensions", value: "Varies by product" },
                      { label: "Weight", value: "Ultra-lightweight" },
                      { label: "Material", value: "Titanium Alloy" },
                      { label: "Warranty", value: "3 Years" },
                      { label: "Connectivity", value: "Bluetooth 5.3 / WiFi 6E" },
                      { label: "Battery", value: "All-day battery life" },
                    ].map((spec, i) => (
                      <div key={i} className="flex justify-between py-3 border-b border-white/5">
                        <span className="text-gray-500">{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="font-display text-2xl font-bold">Customer Reviews</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-gray-400">4.8 out of 5 (124 reviews)</span>
                      </div>
                    </div>
                    <button className="px-6 py-3 rounded-full glass font-bold text-sm hover:bg-white/10 transition-all">
                      Write a Review
                    </button>
                  </div>
                  <div className="space-y-6">
                    {fakeReviews.map((review) => (
                      <div key={review.id} className="glass rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <h5 className="font-bold">{review.name}</h5>
                              <span className="text-gray-500 text-xs">{review.date}</span>
                            </div>
                          </div>
                          <div className="flex text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'shipping' && (
                <div>
                  <h3 className="font-display text-2xl font-bold mb-6">Shipping Information</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <Truck className="text-cyan-400" size={20} />
                        Delivery Options
                      </h4>
                      <ul className="space-y-3 text-gray-400">
                        <li className="flex justify-between">
                          <span>Standard Shipping (5-7 days)</span>
                          <span className="font-bold">$9.99</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Express Shipping (2-3 days)</span>
                          <span className="font-bold">$19.99</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Next Day Delivery</span>
                          <span className="font-bold">$29.99</span>
                        </li>
                        <li className="flex justify-between text-emerald-400">
                          <span>Free Shipping (orders over $500)</span>
                          <span className="font-bold">FREE</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <RotateCcw className="text-cyan-400" size={20} />
                        Return Policy
                      </h4>
                      <p className="text-gray-400 mb-4">
                        We offer a 30-day hassle-free return policy. If you're not completely 
                        satisfied with your purchase, simply return it for a full refund.
                      </p>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-400" />
                          Free return shipping
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-400" />
                          Full refund within 5 business days
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-emerald-400" />
                          Exchange for any product
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-cyan-500 text-[10px] font-black tracking-[0.3em] uppercase block mb-4">You might also like</span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-[var(--foreground)]">Related Products</h2>
              </div>
              <Link href="/#products" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-bold uppercase tracking-wider">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
