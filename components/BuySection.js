'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import PaymentModal from './PaymentModal'

export default function BuySection({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isSold = product.status === 'sold'

  return (
    <>
      {isSold ? (
        <button 
          disabled
          className="flex items-center justify-center gap-3 w-full bg-white/5 text-gray-500 py-6 rounded-2xl text-xl font-black cursor-not-allowed border border-white/5"
        >
          PRODUCT SOLD
        </button>
      ) : (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary/80 text-white py-6 rounded-2xl text-xl font-black transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/20"
        >
          <MessageCircle className="w-6 h-6" /> Buy on WhatsApp
        </button>
      )}

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
      />
    </>
  )
}
