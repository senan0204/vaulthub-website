'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, Lock, Eye, Check, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function GuidePage() {
  const steps = [
    {
      title: "Browse and Select",
      description: "Find the perfect game account or cheat from our premium collection. Use the filters to find your preferred game.",
      icon: <Eye className="w-8 h-8 text-primary" />,
      color: "bg-primary/10",
      border: "border-primary/20"
    },
    {
      title: "Secure Purchase",
      description: "Click 'Buy Now' to initiate the transaction via WhatsApp. Our team will guide you through the payment process.",
      icon: <Lock className="w-8 h-8 text-secondary" />,
      color: "bg-secondary/10",
      border: "border-secondary/20"
    },
    {
      title: "Manual Delivery",
      description: "Once the payment is verified, we manually deliver the account details or cheat setup instructions to ensure 100% security.",
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      color: "bg-yellow-500/10",
      border: "border-yellow-500/20"
    }
  ]

  const features = [
    "100% Manual Verification",
    "Anti-Ban Protection (Cheats)",
    "Lifetime Warranty on Selected Accounts",
    "24/7 Dedicated Support",
    "Secure Payment Options (UPI, PayPal)",
    "Instant Response Times"
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full mb-6"
          >
            <ShieldCheck className="text-secondary w-4 h-4" />
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">Safe & Secure Guide</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            Safe Deal <span className="text-secondary">Process</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            At VaultHub, your security is our #1 priority. 
            We've refined our process to be simple, fast, and 100% safe.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group p-10 rounded-[3rem] border transition-all duration-300 bg-white/5 border-white/10"
            >
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${step.color} border ${step.border}`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" />
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Why Choose <br /> VaultHub?</h2>
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-secondary/20 p-1.5 rounded-full">
                    <Check className="text-secondary w-4 h-4" />
                  </div>
                  <span className="text-gray-300 font-bold">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-black/50 p-8 rounded-[2.5rem] border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Verified Seller Status</h3>
              <p className="text-gray-500 text-sm font-medium">We've completed 1000+ deals with 100% positive feedback across all platforms.</p>
            </div>
            <Link 
              href="/marketplace"
              className="inline-flex items-center justify-center gap-3 bg-white text-black text-xl font-black px-10 py-6 rounded-[2rem] hover:scale-105 transition-all shadow-xl shadow-white/5"
            >
              Start Browsing <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
