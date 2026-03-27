'use client'

import { useState } from 'react'
import ProductCard from "@/components/ProductCard"

export default function ProductList({ initialProducts }) {
  const [filter, setFilter] = useState({
    category: 'All',
    game: 'All',
    status: 'available'
  })

  const filteredProducts = initialProducts.filter(product => {
    const categoryMatch = filter.category === 'All' || product.category === filter.category
    const gameMatch = filter.game === 'All' || product.game === filter.game
    const statusMatch = filter.status === 'All' || product.status === filter.status
    return categoryMatch && gameMatch && statusMatch
  })

  const categories = ['All', 'Game Accounts', 'Game Cheats']
  const games = ['All', 'Genshin Impact', 'Wuthering Waves']
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
            {games.filter(g => g !== 'All').map(game => (
              <button
                key={game}
                onClick={() => setFilter(prev => ({ ...prev, game: prev.game === game ? 'All' : game }))}
                className={`px-6 py-3 rounded-2xl font-bold transition-all border ${
                  filter.game === game 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        {/* Filters logic-only UI */}
        <div className="flex flex-wrap gap-4 items-center bg-white/5 p-6 rounded-[2rem] border border-white/10">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Category</span>
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(prev => ({ ...prev, category: cat }))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    filter.category === cat 
                      ? 'bg-white text-black border-white' 
                      : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/20'
                  }`}
                >
                  {cat}
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
