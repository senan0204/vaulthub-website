'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getSettings } from '@/lib/actions'

export default function Hero() {
  const [whatsapp, setWhatsapp] = useState('919752691095')

  useEffect(() => {
    async function loadSettings() {
      const settings = await getSettings()
      if (settings && settings.whatsapp) {
        setWhatsapp(settings.whatsapp)
      }
    }
    loadSettings()
  }, [])
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-24 overflow-hidden">
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
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <ShieldCheck className="text-secondary w-4 h-4" />
            <span className="text-sm font-bold text-gray-300 uppercase tracking-widest">
              Verified Marketplace
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
            Level Up Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">
              Gaming Journey
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Premium accounts for <span className="text-white font-bold">Genshin Impact</span> & <span className="text-white font-bold">Wuthering Waves</span>. Safe, manual, and instant deals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="#featured"
              className="group relative px-10 py-5 bg-white text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                Browse Accounts <Zap className="w-5 h-5 fill-current" />
              </span>
            </Link>

            <Link 
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              className="group flex items-center gap-3 text-white font-bold px-10 py-5 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all hover:border-primary/50"
            >
              <MessageCircle className="text-primary w-6 h-6" />
              WhatsApp Support
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black text-white text-center">Verified</span>
              <span className="text-xs uppercase tracking-widest font-bold">Deals</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black text-white">100%</span>
              <span className="text-xs uppercase tracking-widest font-bold">Safe Deals</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black text-white">24/7</span>
              <span className="text-xs uppercase tracking-widest font-bold">Live Support</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-black text-white">0%</span>
              <span className="text-xs uppercase tracking-widest font-bold">Risk</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
