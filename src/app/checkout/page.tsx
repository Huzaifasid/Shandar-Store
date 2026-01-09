"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, CreditCard, Truck, Check, ChevronLeft, ChevronRight, 
  Lock, Shield, Package, MapPin, User, Mail, Phone, Building
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';

const steps = [
  { id: 1, name: 'Cart Review', icon: ShoppingBag },
  { id: 2, name: 'Shipping', icon: Truck },
  { id: 3, name: 'Payment', icon: CreditCard },
  { id: 4, name: 'Confirmation', icon: Check },
];

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 29.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    setOrderId(`AURA-${Date.now().toString().slice(-8)}`);
    setOrderComplete(true);
    clearCart();
    setCurrentStep(4);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <main className="min-h-screen py-24 aurora-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center glass-morphism rounded-[48px] p-16">
            <ShoppingBag size={80} className="mx-auto text-gray-600 mb-8" />
            <h1 className="font-display text-4xl font-black mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">Looks like you haven't added any items yet.</p>
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
            <span className="text-gradient">Secure</span> Checkout
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Lock size={14} />
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/10 -translate-y-1/2 rounded-full" />
            <motion.div
              className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 -translate-y-1/2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    step.id <= currentStep
                      ? 'bg-gradient-to-br from-cyan-500 to-purple-500 text-white'
                      : 'glass text-gray-500'
                  }`}
                  animate={{ scale: step.id === currentStep ? 1.1 : 1 }}
                >
                  <step.icon size={20} />
                </motion.div>
                <span className={`mt-2 text-xs font-bold uppercase tracking-wider ${
                  step.id <= currentStep ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Cart Review */}
              {currentStep === 1 && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-morphism rounded-[32px] p-8"
                >
                  <h2 className="font-display text-2xl font-black mb-6">Review Your Items</h2>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-6 border-b border-white/5 last:border-none">
                        <div className="w-24 h-24 bg-white/5 rounded-2xl overflow-hidden shrink-0 relative">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white mb-1">{item.name}</h4>
                          <p className="text-gray-500 text-sm mb-2">Qty: {item.quantity}</p>
                          <p className="text-cyan-400 font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 2 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-morphism rounded-[32px] p-8"
                >
                  <h2 className="font-display text-2xl font-black mb-6">Shipping Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-12 focus:border-cyan-500 outline-none transition-all"
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-12 focus:border-cyan-500 outline-none transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-12 focus:border-cyan-500 outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-12 focus:border-cyan-500 outline-none transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-12 focus:border-cyan-500 outline-none transition-all"
                          placeholder="123 Main Street, Apt 4B"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        City
                      </label>
                      <div className="relative">
                        <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-12 focus:border-cyan-500 outline-none transition-all"
                          placeholder="Los Angeles"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-cyan-500 outline-none transition-all"
                          placeholder="CA"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                          ZIP
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-cyan-500 outline-none transition-all"
                          placeholder="90210"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-morphism rounded-[32px] p-8"
                >
                  <h2 className="font-display text-2xl font-black mb-6">Payment Details</h2>
                  
                  {/* Card Preview */}
                  <div className="mb-8">
                    <div className="relative w-full max-w-md mx-auto aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-cyan-500 p-6 text-white overflow-hidden">
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)`,
                        backgroundSize: '20px 20px'
                      }} />
                      <div className="relative z-10">
                        <div className="text-lg font-bold mb-8">SHANDAR STORE</div>
                        <div className="font-mono text-xl tracking-widest mb-6">
                          {paymentInfo.cardNumber || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-[10px] uppercase opacity-70 mb-1">Card Holder</div>
                            <div className="font-bold">{paymentInfo.cardName || 'YOUR NAME'}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase opacity-70 mb-1">Expires</div>
                            <div className="font-bold">{paymentInfo.expiry || 'MM/YY'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          maxLength={19}
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: formatCardNumber(e.target.value) })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-12 focus:border-cyan-500 outline-none transition-all font-mono"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value.toUpperCase() })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-cyan-500 outline-none transition-all"
                        placeholder="JOHN DOE"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={paymentInfo.expiry}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: formatExpiry(e.target.value) })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-cyan-500 outline-none transition-all font-mono"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value.replace(/\D/g, '') })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:border-cyan-500 outline-none transition-all font-mono"
                          placeholder="•••"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                    <Shield className="text-emerald-400 shrink-0" size={20} />
                    <p className="text-sm text-gray-400">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && orderComplete && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-morphism rounded-[32px] p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-8"
                  >
                    <Check size={48} className="text-white" />
                  </motion.div>
                  
                  <h2 className="font-display text-4xl font-black mb-4">
                    Order <span className="text-gradient">Confirmed!</span>
                  </h2>
                  <p className="text-gray-400 mb-8">
                    Thank you for your purchase. Your order has been placed successfully.
                  </p>
                  
                  <div className="glass rounded-2xl p-6 mb-8 inline-block">
                    <p className="text-sm text-gray-400 mb-2">Order ID</p>
                    <p className="font-mono text-2xl font-bold text-cyan-400">{orderId}</p>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-8">
                    A confirmation email has been sent to <span className="text-white">{shippingInfo.email || 'your email'}</span>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/"
                      className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors"
                    >
                      Continue Shopping
                    </Link>
                    <button className="px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-colors">
                      Track Order
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {!orderComplete && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 rounded-full glass font-bold hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
                
                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2"
                  >
                    Continue
                    <ChevronRight size={18} />
                  </button>
                ) : currentStep === 3 ? (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={18} />
                        Place Order
                      </>
                    )}
                  </button>
                ) : null}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {!orderComplete && (
            <div className="lg:col-span-1">
              <div className="glass-morphism rounded-[32px] p-8 sticky top-24">
                <h3 className="font-display text-xl font-black mb-6">Order Summary</h3>
                
                {/* Items Preview */}
                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/5 rounded-xl relative shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-gray-500 text-sm">+{items.length - 3} more items</p>
                  )}
                </div>
                
                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span>{shipping === 0 ? <span className="text-emerald-400">FREE</span> : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex justify-between items-end">
                      <span className="font-bold">Total</span>
                      <span className="font-display text-3xl font-black text-gradient">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Shield size={16} className="text-emerald-400" />
                    <span>Secure SSL Payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Package size={16} className="text-cyan-400" />
                    <span>Free Returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Truck size={16} className="text-purple-400" />
                    <span>Free shipping over $500</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
