'use client'

import Link from 'next/link'
import { ShieldCheck, MessageCircle, Home, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getSettings } from '@/lib/actions'
import Image from 'next/image'

export default function Navbar() {
  const [settings, setSettings] = useState({ logo: '', whatsapp: '919752691095' })

  useEffect(() => {
    async function loadSettings() {
      const data = await getSettings()
      if (data) {
        setSettings({
          logo: data.logo || '',
          whatsapp: data.whatsapp || '919752691095'
        })
      }
    }
    loadSettings()
  }, [])

  const whatsappUrl = `https://wa.me/${settings.whatsapp}`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300 relative overflow-hidden border border-white/10 shadow-primary/20">
            {settings.logo ? (
              <Image 
                src={settings.logo} 
                alt="VaultHub Logo" 
                fill 
                className="object-cover object-center"
              />
            ) : (
              <ShieldCheck className="text-white w-6 h-6" />
            )}
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-secondary transition-all">
            VaultHub
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href={whatsappUrl} target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Support
          </Link>
          <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-2">
            <User className="w-4 h-4" /> Admin
          </Link>
        </div>

        <Link 
          href={whatsappUrl}
          target="_blank"
          className="bg-primary hover:bg-primary/80 text-white px-5 py-2 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  )
}
