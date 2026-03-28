'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, CheckCircle2, Lock, Shield } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-hero-gradient -z-10" />
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
            <ShieldCheck className="text-secondary w-4 h-4" />
            <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">
              Verified Marketplace
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4">
            <span className="text-white">Vault</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">Hub</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Premium game accounts and advanced cheats for <span className="text-white font-bold">Genshin Impact</span>, <span className="text-white font-bold">Wuthering Waves</span>, <span className="text-white font-bold">Honkai Star Rail</span> & <span className="text-white font-bold">Free Fire</span>. Safe, manual, and instant delivery.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-300 mb-8 tracking-wide">
            <span className="inline-flex items-center gap-2 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(124,58,237,0.10)]">
              <CheckCircle2 className="w-4 h-4 text-secondary drop-shadow-[0_0_10px_rgba(139,92,246,0.45)]" />
              Verified Deals
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="inline-flex items-center gap-2 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(59,130,246,0.08)]">
              <Lock className="w-4 h-4 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.35)]" />
              100% Safe
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="inline-flex items-center gap-2 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(124,58,237,0.10)]">
              <Zap className="w-4 h-4 text-secondary drop-shadow-[0_0_10px_rgba(139,92,246,0.45)]" />
              Instant Delivery
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="inline-flex items-center gap-2 font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(59,130,246,0.08)]">
              <Shield className="w-4 h-4 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.35)]" />
              0% Risk
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/marketplace"
              className="group relative px-10 py-5 bg-white text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                Browse Accounts <Zap className="w-5 h-5 fill-current" />
              </span>
            </Link>

            <Link 
              href="/cheats"
              className="group flex items-center gap-3 text-white font-bold px-10 py-5 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all hover:border-primary/50"
            >
              <Zap className="text-primary w-6 h-6 fill-primary" />
              Browse Cheats
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
