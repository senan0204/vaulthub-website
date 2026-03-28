'use client'

import { motion } from 'framer-motion'
import { Zap, Monitor, Smartphone, Star } from 'lucide-react'
import Link from 'next/link'

export default function CheatsPage() {
  const categories = [
    {
      title: "Genshin Impact (PC)",
      game: "Genshin Impact",
      icon: <Monitor className="w-8 h-8 text-primary" />,
      href: "/marketplace?type=cheat&category=Genshin+Impact"
    },
    {
      title: "Wuthering Waves (PC)",
      game: "Wuthering Waves",
      icon: <Monitor className="w-8 h-8 text-secondary" />,
      href: "/marketplace?type=cheat&category=Wuthering+Waves"
    },
    {
      title: "Honkai Star Rail (PC)",
      game: "Honkai Star Rail",
      icon: <Monitor className="w-8 h-8 text-blue-500" />,
      href: "/marketplace?type=cheat&category=Honkai+Star+Rail"
    },
    {
      title: "Free Fire (PC)",
      game: "Free Fire PC",
      icon: <Monitor className="w-8 h-8 text-red-500" />,
      href: "/marketplace?type=cheat&category=Free+Fire+PC"
    },
    {
      title: "Free Fire (Mobile)",
      game: "Free Fire Mobile",
      icon: <Smartphone className="w-8 h-8 text-red-500" />,
      href: "/marketplace?type=cheat&category=Free+Fire+Mobile"
    },
    {
      title: "Custom Cheat (Free Fire Only)",
      subtitle: "Personalized private build",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      href: "/custom-cheat",
      featured: true
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
            <Zap className="text-primary w-4 h-4 fill-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Premium Cheats</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            Choose Your <span className="text-primary">Game</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Select a game to browse our collection of safe, undetected, and high-performance cheats. 
            All cheats are manually verified and updated regularly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                href={cat.href}
                className={`group block p-8 rounded-[2.5rem] border transition-all duration-300 hover:scale-[1.02] ${
                  cat.featured 
                  ? 'bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20 hover:border-yellow-500/40 shadow-2xl shadow-yellow-500/5' 
                  : 'bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/[0.08]'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                  cat.featured ? 'bg-yellow-500/20' : 'bg-black/50 border border-white/10'
                }`}>
                  {cat.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${cat.featured ? 'text-yellow-500' : 'text-white'}`}>
                  {cat.title}
                </h3>
                {cat.subtitle && (
                  <p className="text-gray-500 text-sm font-medium">{cat.subtitle}</p>
                )}
                <div className="mt-8 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <span className={cat.featured ? 'text-yellow-500' : 'text-primary'}>Browse Now</span>
                  <Zap className={`w-4 h-4 ${cat.featured ? 'fill-yellow-500' : 'fill-primary'}`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
