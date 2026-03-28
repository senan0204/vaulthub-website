'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function MarketplacePreview({ products }) {
  // Show only first 3 products
  const previewProducts = products.slice(0, 3)

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Marketplace <span className="text-primary">Preview</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Explore our latest and hottest deals in the marketplace. 
              Find premium accounts and undetected cheats here.
            </p>
          </div>
          <Link 
            href="/marketplace"
            className="group flex items-center gap-2 text-white font-bold bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl border border-white/10 transition-all"
          >
            View All Marketplace <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {previewProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
