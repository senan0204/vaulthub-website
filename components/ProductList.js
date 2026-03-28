'use client'

import { useState, useEffect, Suspense } from 'react'
import ProductCard from "@/components/ProductCard"
import { useSearchParams } from 'next/navigation'

function ProductListContent({ initialProducts }) {
  const searchParams = useSearchParams()
  const [filter, setFilter] = useState({
    type: 'All',
    category: 'All',
    status: 'available',
    query: ''
  })

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'All'
    const category = searchParams.get('category') || 'All'
    setFilter(prev => ({ 
      ...prev, 
      query: q.toLowerCase(),
      type: type,
      category: category
    }))
  }, [searchParams])

  const filteredProducts = initialProducts.filter(product => {
    const typeMatch = filter.type === 'All' || product.type === filter.type
    const categoryMatch = filter.category === 'All' || product.category === filter.category
    const statusMatch = filter.status === 'All' || product.status === filter.status
    const queryMatch = !filter.query || 
      product.title.toLowerCase().includes(filter.query) || 
      product.description.toLowerCase().includes(filter.query) ||
      (product.category && product.category.toLowerCase().includes(filter.query))

    return typeMatch && categoryMatch && statusMatch && queryMatch
  })

  const types = ['All', 'account', 'cheat']
  const categories = ['All', 'Genshin Impact', 'Wuthering Waves', 'Honkai Star Rail', 'Free Fire PC', 'Free Fire Mobile']
  const statuses = [
    { label: 'Available', value: 'available' },
    { label: 'Sold', value: 'sold' },
    { label: 'All', value: 'All' }
  ]

  return (
    <section id="featured" className="py-24">
      <div className="flex flex-col mb-16 gap-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Marketplace
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Hand-picked, high-end accounts and cheats with verified security and manual delivery.
            </p>
          </div>
          
          <div className="hidden md:flex gap-4">
            {categories.filter(g => g !== 'All').map(category => (
              <button
                key={category}
                onClick={() => setFilter(prev => ({ ...prev, category: prev.category === category ? 'All' : category }))}
                className={`px-6 py-3 rounded-2xl font-bold transition-all border ${
                  filter.category === category 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filters logic-only UI */}
        <div className="flex flex-wrap gap-4 items-center bg-white/5 p-6 rounded-[2rem] border border-white/10">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Type</span>
            <div className="flex gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(prev => ({ ...prev, type: type }))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    filter.type === type 
                      ? 'bg-white text-black border-white' 
                      : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-10 bg-white/10 mx-2 hidden md:block" />

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Status</span>
            <div className="flex gap-2">
              {statuses.map(s => (
                <button
                  key={s.value}
                  onClick={() => setFilter(prev => ({ ...prev, status: s.value }))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    filter.status === s.value 
                      ? 'bg-white text-black border-white' 
                      : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 p-16 rounded-3xl text-center">
          <p className="text-gray-400 text-xl font-bold italic opacity-50">No matches found for your current filters.</p>
        </div>
      )}
    </section>
  )
}

export default function ProductList({ initialProducts }) {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading marketplace...</div>}>
      <ProductListContent initialProducts={initialProducts} />
    </Suspense>
  )
}
