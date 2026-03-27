'use client'

import { useState, useEffect } from 'react'
import { getProducts, addProduct, deleteProduct, updateProduct, getSettings, updateSettings, getSlides, updateSlides } from '@/lib/actions'
import { Plus, Trash2, Edit2, ShieldCheck, X, Save, Settings, Layout } from 'lucide-react'
import Image from 'next/image'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isSliderModalOpen, setIsSliderModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [settings, setSettings] = useState({ logo: '', whatsapp: '' })
  const [slides, setSlides] = useState([])
  const [formData, setFormData] = useState({
    game: 'Genshin Impact',
    category: 'Game Accounts',
    status: 'available',
    isHotDeal: false,
    title: '',
    price: '',
    description: '',
    images: [''],
    video: ''
  })

  useEffect(() => {
    if (isLoggedIn) {
      loadProducts()
      loadSettings()
      loadSlides()
    }
  }, [isLoggedIn])

  const loadProducts = async () => {
    const data = await getProducts()
    setProducts(data)
  }

  const loadSettings = async () => {
    const data = await getSettings()
    setSettings(data)
  }

  const loadSlides = async () => {
    const data = await getSlides()
    setSlides(data)
  }

  const handleUpdateSlides = async (e) => {
    e.preventDefault()
    await updateSlides(slides)
    setIsSliderModalOpen(false)
    alert('Slider updated successfully!')
  }

  const handleUpdateSettings = async (e) => {
    e.preventDefault()
    await updateSettings(settings)
    setIsSettingsOpen(false)
    alert('Settings updated successfully!')
    window.location.reload() // Reload to update navbar
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'adminsen4nnn' || password === 'adminnero') { 
      setIsLoggedIn(true)
    } else {
      alert('Incorrect password!')
    }
  }

  const handleAddOrUpdate = async (e) => {
    e.preventDefault()
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData)
    } else {
      await addProduct(formData)
    }
    setIsModalOpen(false)
    setEditingProduct(null)
    setFormData({ 
      game: 'Genshin Impact', 
      category: 'Game Accounts', 
      status: 'available', 
      isHotDeal: false, 
      title: '', 
      price: '', 
      description: '', 
      images: [''], 
      video: '' 
    })
    loadProducts()
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id)
      loadProducts()
    }
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setFormData({
      ...product,
      category: product.category || 'Game Accounts',
      status: product.status || 'available',
      isHotDeal: product.isHotDeal || false,
      images: product.images || [''],
      video: product.video || ''
    })
    setIsModalOpen(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <form onSubmit={handleLogin} className="bg-accent/50 p-10 rounded-3xl border border-white/10 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <ShieldCheck className="text-white w-10 h-10" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-8">Admin Access</h1>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white mb-6 focus:border-primary outline-none transition-all"
          />
          <button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-xl transition-all">
            Unlock Dashboard
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your marketplace inventory</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSliderModalOpen(true)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl transition-all border border-white/10"
          >
            <Layout className="w-5 h-5" /> Slider Content
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl transition-all border border-white/10"
          >
            <Settings className="w-5 h-5" /> Site Settings
          </button>
          <button 
            onClick={() => {
              setEditingProduct(null)
            setFormData({ 
              game: 'Genshin Impact', 
              category: 'Game Accounts', 
              status: 'available', 
              isHotDeal: false, 
              title: '', 
              price: '', 
              description: '', 
              images: [''], 
              video: '' 
            })
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className={`bg-accent/30 border border-white/10 rounded-3xl p-6 group transition-all ${product.status === 'sold' ? 'opacity-50' : ''}`}>
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
              <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
              {product.status === 'sold' && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-black text-2xl tracking-tighter border-2 border-white px-4 py-1 rotate-[-12deg]">SOLD</span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white">{product.title}</h3>
              <span className="text-primary font-bold">{product.price}</span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                {product.game}
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                {product.category || 'Game Accounts'}
              </span>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button 
                  onClick={() => openEditModal(product)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center justify-center w-12 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-xl font-bold transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              {product.status !== 'sold' && (
                <button 
                  onClick={async () => {
                    await updateProduct(product.id, { ...product, status: 'sold' })
                    loadProducts()
                  }}
                  className="w-full bg-white/10 hover:bg-white text-white hover:text-black py-3 rounded-xl font-bold transition-all text-sm"
                >
                  Mark as Sold
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-accent/90 border border-white/10 w-full max-w-2xl p-10 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-white">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            <form onSubmit={handleAddOrUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                  >
                    <option value="Game Accounts">Game Accounts</option>
                    <option value="Game Cheats">Game Cheats</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Game</label>
                  <select 
                    value={formData.game}
                    onChange={(e) => setFormData({...formData, game: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                  >
                    <option value="Genshin Impact">Genshin Impact</option>
                    <option value="Wuthering Waves">Wuthering Waves</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Price</label>
                  <input 
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                    placeholder="10500 or Negotiable"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <input 
                  type="checkbox"
                  id="hotDeal"
                  checked={formData.isHotDeal}
                  onChange={(e) => setFormData({...formData, isHotDeal: e.target.checked})}
                  className="w-5 h-5 rounded border-white/10 bg-black/50 text-primary focus:ring-primary"
                />
                <label htmlFor="hotDeal" className="text-sm font-bold text-white cursor-pointer select-none flex items-center gap-2">
                  Mark as Hot Deal
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Product Title</label>
                <input 
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                  placeholder="AR 59 High-End Account"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none"
                  placeholder="Detailed description of the account..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Image URLs</label>
                <div className="space-y-3">
                  {formData.images.map((url, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        type="url"
                        required
                        value={url}
                        onChange={(e) => {
                          const newImages = [...formData.images]
                          newImages[idx] = e.target.value
                          setFormData({...formData, images: newImages})
                        }}
                        className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.images.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => {
                            const newImages = formData.images.filter((_, i) => i !== idx)
                            setFormData({...formData, images: newImages})
                          }}
                          className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, images: [...formData.images, '']})}
                    className="text-primary font-bold text-sm flex items-center gap-1 hover:text-secondary transition-colors ml-1"
                  >
                    <Plus className="w-4 h-4" /> Add Another Image
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Video URL (Optional - YouTube or direct link)</label>
                <input 
                  type="url"
                  value={formData.video || ''}
                  onChange={(e) => setFormData({...formData, video: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white font-black py-5 rounded-2xl text-xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                <Save className="w-6 h-6" /> {editingProduct ? 'Update Listing' : 'Publish Listing'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isSliderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSliderModalOpen(false)} />
          <div className="relative bg-accent/90 border border-white/10 w-full max-w-4xl p-10 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-white">Slider Management</h2>
              <button onClick={() => setIsSliderModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            <form onSubmit={handleUpdateSlides} className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                {slides.map((slide, idx) => (
                  <div key={idx} className="bg-black/30 p-6 rounded-3xl border border-white/10 space-y-6 relative group">
                    <button 
                      type="button"
                      onClick={() => setSlides(slides.filter((_, i) => i !== idx))}
                      className="absolute top-4 right-4 text-red-500 hover:bg-red-500/10 p-2 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Slide Title</label>
                          <input 
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const newSlides = [...slides]
                              newSlides[idx].title = e.target.value
                              setSlides(newSlides)
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                            placeholder="PREMIUM GENSHIN ACCOUNTS"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Slide Subtitle</label>
                          <textarea 
                            rows={2}
                            value={slide.subtitle}
                            onChange={(e) => {
                              const newSlides = [...slides]
                              newSlides[idx].subtitle = e.target.value
                              setSlides(newSlides)
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none"
                            placeholder="Get the best C6 characters today."
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Image URL</label>
                          <input 
                            type="url"
                            value={slide.image}
                            onChange={(e) => {
                              const newSlides = [...slides]
                              newSlides[idx].image = e.target.value
                              setSlides(newSlides)
                            }}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                            placeholder="https://i.imgur.com/..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Button Text</label>
                            <input 
                              type="text"
                              value={slide.buttonText}
                              onChange={(e) => {
                                const newSlides = [...slides]
                                newSlides[idx].buttonText = e.target.value
                                setSlides(newSlides)
                              }}
                              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                              placeholder="View Deals"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Linked Product ID</label>
                            <select 
                              value={slide.linkedProductId}
                              onChange={(e) => {
                                const newSlides = [...slides]
                                newSlides[idx].linkedProductId = e.target.value
                                setSlides(newSlides)
                              }}
                              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                            >
                              <option value="">None</option>
                              {products.map(p => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                type="button"
                onClick={() => setSlides([...slides, { id: Date.now().toString(), image: '', title: '', subtitle: '', buttonText: 'View Deals', linkedProductId: '' }])}
                className="w-full border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 text-gray-400 hover:text-primary py-4 rounded-2xl transition-all font-bold flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add New Slide
              </button>

              <button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white font-black py-4 rounded-2xl text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                <Save className="w-5 h-5" /> Save Slider Content
              </button>
            </form>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
          <div className="relative bg-accent/90 border border-white/10 w-full max-w-lg p-10 rounded-[2.5rem] shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-white">Site Settings</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            <form onSubmit={handleUpdateSettings} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Site Logo URL</label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-black/50 border border-white/10 rounded-2xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center relative overflow-hidden shrink-0 border border-white/10">
                      {settings.logo ? (
                        <Image src={settings.logo} alt="Logo Preview" fill className="object-cover object-center" />
                      ) : (
                        <ShieldCheck className="text-white w-8 h-8" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white mb-1">Logo Preview</p>
                      <p className="text-xs text-gray-500">How it looks in the navbar</p>
                    </div>
                  </div>
                  <input 
                    type="url"
                    value={settings.logo}
                    onChange={(e) => setSettings({...settings, logo: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-[10px] text-gray-500 px-1">
                    Enter a direct link to your logo image. Transparent PNG or SVG recommended.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">WhatsApp Number</label>
                <input 
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                  placeholder="919752691095"
                />
                <p className="text-[10px] text-gray-500 px-1 mt-2">
                  Enter your WhatsApp number with country code (e.g. 919752691095). No spaces or symbols.
                </p>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white font-black py-4 rounded-2xl text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 mt-4">
                <Save className="w-5 h-5" /> Save Settings
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
