'use client'

import { X, CreditCard, DollarSign } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getSettings } from '@/lib/actions'

export default function PaymentModal({ isOpen, onClose, product }) {
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

  if (!isOpen) return null

  const handlePayment = (method) => {
    const priceValue = parseFloat(product.price)
    const isNumericPrice = !isNaN(priceValue)
    let message = ''
    let priceFormatted = product.price

    if (method === 'UPI') {
      priceFormatted = isNumericPrice ? 'INR ' + priceValue : product.price
      message = 'Hello, I want to buy:\n\nProduct: ' + product.title + '\nPrice: ' + priceFormatted + '\nPayment Method: UPI\n\nFrom VaultHub'
    } else if (method === 'PayPal') {
      if (isNumericPrice) {
        const priceUSD = (priceValue / 94).toFixed(2)
        priceFormatted = 'USD ' + priceUSD
      } else {
        priceFormatted = product.price
      }
      message = 'Hello, I want to buy:\n\nProduct: ' + product.title + '\nPrice: ' + priceFormatted + '\nPayment Method: PayPal\n\nFrom VaultHub'
    }

    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-accent/90 border border-white/10 w-full max-w-md p-8 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white">Select Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Choose your preferred payment method to continue with the purchase of <span className="text-white font-bold">{product.title}</span>.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => handlePayment('UPI')}
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 text-white p-6 rounded-2xl font-bold transition-all border border-white/5 hover:border-primary group"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-lg">UPI</div>
              <div className="text-xs text-gray-500">Pay in INR ({product.price})</div>
            </div>
          </button>

          <button 
            onClick={() => handlePayment('PayPal')}
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 text-white p-6 rounded-2xl font-bold transition-all border border-white/5 hover:border-secondary group"
          >
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-lg">PayPal</div>
              <div className="text-xs text-gray-500">
                {isNaN(parseFloat(product.price)) ? `Pay via PayPal (${product.price})` : `Pay in USD (${(parseFloat(product.price) / 94).toFixed(2)})`}
              </div>
            </div>
          </button>
        </div>

        <p className="text-[10px] text-gray-600 mt-8 text-center uppercase tracking-widest font-bold">
          All deals are handled manually for safety.
        </p>
      </div>
    </div>
  )
}
