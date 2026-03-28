import { getProductById } from "@/lib/actions";
import Link from "next/link";
import { ShieldCheck, Zap, ArrowLeft, Star } from "lucide-react";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import BuySection from "@/components/BuySection";

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);
  const isPremium = !!product?.isPremium

  const formatPrice = (priceStr) => {
    if (!priceStr) return "₹0"
    const numericPrice = String(priceStr).replace(/[^0-9]/g, '')
    if (!numericPrice) return String(priceStr)
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(numericPrice)
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-24">
      <Link href="/marketplace" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Images & Video */}
        <div className="relative">
          <ProductGallery images={product.images} video={product.video} />
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            <div className={`backdrop-blur-md px-4 py-2 rounded-full border text-sm font-bold text-white uppercase tracking-widest ${
              isPremium ? 'bg-yellow-500/80 border-yellow-500/50' : 'bg-black/60 border-white/10'
            }`}>
              {product.category || 'Game Accounts'}
            </div>
            {product.isHotDeal && product.status !== 'sold' && (
              <div className="bg-red-600/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] font-black text-white uppercase tracking-tighter w-fit animate-pulse">
                HOT DEAL
              </div>
            )}
            {isPremium && (
              <div className="bg-yellow-500 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-400 text-[10px] font-black text-black uppercase tracking-tighter w-fit shadow-lg shadow-yellow-500/20">
                PREMIUM
              </div>
            )}
            {product.status === 'sold' && (
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-[10px] font-black text-white uppercase tracking-tighter w-fit">
                SOLD
              </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                {product.category || 'Game Accounts'}
              </span>
            </div>
            <h1 className="text-5xl font-black text-white mb-6 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-6 mb-8">
              <span className={`text-4xl font-black ${isPremium ? 'text-yellow-500' : 'text-primary'}`}>{formatPrice(product.price)}</span>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="flex items-center gap-1 text-secondary">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-2 text-gray-400 font-bold">5.0</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-10 whitespace-pre-wrap">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="block text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Type</span>
                <span className="text-white font-bold capitalize">{product.type || 'account'}</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="block text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Status</span>
                <span className={`${product.status === 'sold' ? 'text-red-400' : 'text-green-400'} font-bold capitalize`}>
                  {product.status || 'available'}
                </span>
              </div>
            </div>

            <BuySection product={product} />
          </div>

          <div className="mt-auto space-y-6 pt-10 border-t border-white/5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Safe Transaction</h4>
                <p className="text-sm text-gray-400">Manual delivery ensures your account is transferred safely without any risk.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Fast Delivery</h4>
                <p className="text-sm text-gray-400">Receive your account details within minutes after the transaction is confirmed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
