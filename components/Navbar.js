'use client'

import Link from 'next/link'
import { ShieldCheck, MessageCircle, Home, User, Menu, X, Zap, Search } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'

function SearchInput({ searchQuery, setSearchQuery, handleSearch }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setSearchQuery(q)
  }, [searchParams, setSearchQuery])

  return (
    <form 
      onSubmit={handleSearch}
      className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-primary transition-all flex-1 max-w-[100px] xs:max-w-[120px] sm:max-w-[150px] md:max-w-[180px] mx-4"
    >
      <Search className="w-3 h-3 text-gray-500 mr-2 shrink-0" />
      <input 
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent border-none outline-none text-[10px] text-white placeholder-gray-500 w-full"
      />
    </form>
  )
}

export default function Navbar() {
  const [settings, setSettings] = useState({ logo: '', whatsapp: '919752691095' })
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' })
        const data = await res.json()
        if (data) {
          setSettings({
            logo: data.logo || '',
            whatsapp: data.whatsapp || '919752691095'
          })
        }
      } catch (error) {
        console.error("Failed to load settings:", error)
      }
    }
    loadSettings()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/marketplace?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/marketplace')
    }
  }

  const whatsappUrl = `https://wa.me/${settings.whatsapp}`

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Marketplace', href: '/marketplace', icon: Zap },
    { name: 'Cheats', href: '/cheats', icon: Zap },
    { name: 'Guide', href: '/guide', icon: ShieldCheck },
    { name: 'Support', href: '/support', icon: MessageCircle },
    { name: 'Admin', href: '/admin', icon: User },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-white/5 shadow-lg shadow-black/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300 relative overflow-hidden border border-white/10 shadow-primary/20">
            {settings.logo ? (
              <Image 
                src={settings.logo} 
                alt="VaultHub Logo" 
                fill 
                className="object-cover object-center"
                sizes="(max-width: 768px) 32px, 40px"
              />
            ) : (
              <ShieldCheck className="text-white w-4 h-4" />
            )}
          </div>
          <span className="text-base md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-secondary transition-all">
            VaultHub
          </span>
        </Link>

        {/* Search Bar - Positioned in header for both Mobile & Desktop */}
        <Suspense fallback={<div className="flex-1 max-w-[100px] xs:max-w-[120px] sm:max-w-[150px] md:max-w-[180px] mx-4" />}>
          <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        </Suspense>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium text-gray-400 shrink-0">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              target={item.external ? "_blank" : undefined}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <item.icon className="w-3.5 h-3.5" /> {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link 
            href={whatsappUrl}
            target="_blank"
            className="hidden sm:block bg-primary hover:bg-primary/80 text-white px-5 py-2 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 text-xs md:text-base"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-16 bg-black/80 z-40 md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-[280px] bg-[#000000] border-l border-white/10 z-50 md:hidden p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-lg font-bold text-gray-300 hover:text-primary transition-colors group py-2"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    {item.name}
                  </Link>
                ))}
                
                <div className="h-px bg-white/5 my-2" />
                
                <Link 
                  href={whatsappUrl}
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-2xl font-black text-center transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 mt-2"
                >
                  <MessageCircle className="w-5 h-5" /> CONTACT US
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
