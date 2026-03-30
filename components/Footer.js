'use client'

import { ShieldCheck, Mail, Instagram, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [whatsapp, setWhatsapp] = useState('919752691095')

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' })
        const data = await res.json()
        if (data && data.whatsapp) setWhatsapp(data.whatsapp)
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
    loadSettings()
  }, [])

  return (
    <footer className="bg-black border-t border-white/5 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">VaultHub</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Premium Game Accounts Marketplace. Safe, manual, and instant delivery for your favorite titles.
            </p>
            <div className="flex gap-4">
              <Link href={`https://wa.me/${whatsapp}`} target="_blank" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com/vault.hub01" target="_blank" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="mailto:senandujana@gmail.com" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Panel</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> +{whatsapp}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> senandujana@gmail.com
              </li>
              <li className="flex items-center gap-2 text-xs italic">
                "All deals are handled manually to ensure safety."
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} VaultHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
