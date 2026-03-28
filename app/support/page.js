'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, Instagram, Clock, ShieldCheck, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function SupportPage() {
  const [whatsapp, setWhatsapp] = useState('919752691095')

  useEffect(() => {
    const controller = new AbortController()
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store', signal: controller.signal })
        const data = await res.json()
        if (data && data.whatsapp) setWhatsapp(data.whatsapp)
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('Failed to load settings:', error)
        }
      }
    }
    loadSettings()
    return () => controller.abort()
  }, [])

  const contactMethods = [
    {
      name: "WhatsApp Support",
      description: "Get instant help from our team.",
      value: "24/7 Live Chat",
      icon: <MessageCircle className="w-8 h-8 text-[#25D366]" />,
      href: `https://wa.me/${whatsapp}`,
      color: "bg-[#25D366]/10",
      border: "border-[#25D366]/20"
    },
    {
      name: "Email Support",
      description: "For business and complex queries.",
      value: "support@vaulthub.com",
      icon: <Mail className="w-8 h-8 text-primary" />,
      href: "mailto:support@vaulthub.com",
      color: "bg-primary/10",
      border: "border-primary/20"
    },
    {
      name: "Instagram",
      description: "Follow us for updates and deals.",
      value: "@VaultHub_Official",
      icon: <Instagram className="w-8 h-8 text-secondary" />,
      href: "https://instagram.com/vault.hub01",
      color: "bg-secondary/10",
      border: "border-secondary/20"
    }
  ]

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6"
          >
            <Clock className="text-primary w-4 h-4" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Available 24/7</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            How can we <span className="text-primary">help?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Our support team is here to ensure you have the best experience. 
            Choose a contact method below to get started.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, idx) => (
            <motion.a
              key={idx}
              href={method.href}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group p-10 rounded-[3rem] border transition-all duration-300 hover:scale-[1.02] bg-white/5 border-white/10 hover:bg-white/[0.08]`}
            >
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${method.color} border ${method.border}`}>
                {method.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{method.name}</h3>
              <p className="text-gray-500 text-sm font-medium mb-6">{method.description}</p>
              <div className="text-lg font-black text-white tracking-tight">{method.value}</div>
            </motion.a>
          ))}
        </div>

        <div className="mt-24 p-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[3rem] border border-white/5 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Manual Verification System</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            All deals are handled manually by our team to ensure 100% security. 
            No automated scripts, just real humans protecting your transactions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 bg-black/50 px-6 py-3 rounded-2xl border border-white/10">
              <ShieldCheck className="text-primary w-5 h-5" />
              <span className="text-sm font-bold text-white">Safe Transactions</span>
            </div>
            <div className="flex items-center gap-2 bg-black/50 px-6 py-3 rounded-2xl border border-white/10">
              <Zap className="text-secondary w-5 h-5" />
              <span className="text-sm font-bold text-white">Fast Response</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
