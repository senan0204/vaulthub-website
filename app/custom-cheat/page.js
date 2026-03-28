'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Monitor, Smartphone, Check, ChevronRight, MessageCircle } from 'lucide-react'

export default function CustomCheatPage() {
  const [step, setStep] = useState(1)
  const [whatsapp, setWhatsapp] = useState('919752691095')
  const [formData, setFormData] = useState({
    version: '', // 'PC' or 'Mobile'
    model: '',
    ram: '',
    processor: ''
  })

  useEffect(() => {
    const controller = new AbortController()
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store', signal: controller.signal })
        const data = await res.json()
        if (data && data.whatsapp) setWhatsapp(data.whatsapp)
      } catch (error) {
        if (error?.name !== 'AbortError') {
          console.error('Failed to load settings:', error)
        }
      }
    }
    loadSettings()
    return () => controller.abort()
  }, [])

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleContinue = () => {
    const message = `Hello, I want a custom cheat for Free Fire.

Version: ${formData.version}

Device Details:
- Model / Specs: ${formData.model}
- RAM: ${formData.ram}
- Processor/GPU: ${formData.processor}

Please guide me further.`

    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full mb-6"
          >
            <Zap className="text-yellow-500 w-4 h-4 fill-yellow-500" />
            <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Exclusive Service</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            Get Your Personal <span className="text-yellow-500">Custom Cheat</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8"
          >
            {[
              "Personalized for you",
              "Private build",
              "Safer than public",
              "Optimized performance"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
                <Check className="text-yellow-500 w-4 h-4" />
                <span className="text-xs font-bold text-gray-300">{text}</span>
              </div>
            ))}
          </motion.div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Currently available only for <span className="text-white">Free Fire</span>
          </p>
        </div>

        {/* Multi-step Form Container */}
        <div className="relative bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl">
          {/* Progress Indicator */}
          <div className="flex gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step >= s ? 'bg-yellow-500 shadow-lg shadow-yellow-500/20' : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Step 1: Select Version</h2>
                  <p className="text-gray-400">Choose the platform you play on.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, version: 'PC' })
                      nextStep()
                    }}
                    className={`group p-8 rounded-[2rem] border transition-all text-left ${
                      formData.version === 'PC' 
                      ? 'bg-yellow-500 border-yellow-500' 
                      : 'bg-black/50 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                      formData.version === 'PC' ? 'bg-black text-yellow-500' : 'bg-white/5 text-white'
                    }`}>
                      <Monitor className="w-8 h-8" />
                    </div>
                    <h3 className={`text-2xl font-bold ${formData.version === 'PC' ? 'text-black' : 'text-white'}`}>Free Fire (PC)</h3>
                    <p className={`mt-2 text-sm font-medium ${formData.version === 'PC' ? 'text-black/70' : 'text-gray-500'}`}>Emulator optimization included</p>
                  </button>

                  <button
                    onClick={() => {
                      setFormData({ ...formData, version: 'Mobile' })
                      nextStep()
                    }}
                    className={`group p-8 rounded-[2rem] border transition-all text-left ${
                      formData.version === 'Mobile' 
                      ? 'bg-yellow-500 border-yellow-500' 
                      : 'bg-black/50 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                      formData.version === 'Mobile' ? 'bg-black text-yellow-500' : 'bg-white/5 text-white'
                    }`}>
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <h3 className={`text-2xl font-bold ${formData.version === 'Mobile' ? 'text-black' : 'text-white'}`}>Free Fire (Mobile)</h3>
                    <p className={`mt-2 text-sm font-medium ${formData.version === 'Mobile' ? 'text-black/70' : 'text-gray-500'}`}>Smooth touchscreen controls</p>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Step 2: Device Details</h2>
                  <p className="text-gray-400">Tell us about your hardware for optimization.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                      {formData.version === 'PC' ? 'PC Specs / GPU' : 'Phone Model'}
                    </label>
                    <input 
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder={formData.version === 'PC' ? "e.g. RTX 3060, GTX 1650" : "e.g. iPhone 15 Pro, S24 Ultra"}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">RAM</label>
                    <input 
                      type="text"
                      value={formData.ram}
                      onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                      placeholder="e.g. 8GB, 16GB"
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-500 outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Processor</label>
                    <input 
                      type="text"
                      value={formData.processor}
                      onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
                      placeholder={formData.version === 'PC' ? "e.g. i5-12400F, Ryzen 5 5600" : "e.g. Snapdragon 8 Gen 3 (Optional)"}
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-yellow-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={prevStep}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl transition-all border border-white/10"
                  >
                    Back
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={!formData.model || !formData.ram}
                    className="flex-[2] bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-5 rounded-2xl transition-all shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-8"
              >
                <div className="w-24 h-24 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/20">
                  <Zap className="text-yellow-500 w-12 h-12 fill-yellow-500" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Configuration Complete</h2>
                <p className="text-gray-400 max-w-sm mx-auto mb-12">
                  We've gathered your device details. Click the button below to send your request via WhatsApp.
                </p>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleContinue}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-6 rounded-3xl transition-all shadow-2xl shadow-[#25D366]/20 flex items-center justify-center gap-3 text-xl"
                  >
                    <MessageCircle className="w-7 h-7 fill-current" /> Order Custom Cheat
                  </button>
                  <button 
                    onClick={prevStep}
                    className="text-gray-500 hover:text-white font-bold transition-all text-sm"
                  >
                    Edit Details
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
