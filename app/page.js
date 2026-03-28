import Hero from "@/components/Hero";
import HotDealSlider from "@/components/HotDealSlider";
import { Zap, ShieldCheck } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex flex-col pb-10 md:pb-14">
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Hot Deals Slider */}
      <div className="container mx-auto px-4 mt-10 md:mt-12 relative z-20 mb-16 md:mb-20">
        <HotDealSlider />
      </div>

      {/* 3. Key Features Preview */}
      <div className="container mx-auto px-4 mb-24">
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
          <div className="flex items-center gap-5 p-6 md:p-7 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group flex-1 max-w-xl">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Verified Deals</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Every transaction is manually verified for your safety.</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-6 md:p-7 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group flex-1 max-w-xl">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-secondary" />
            </div>
            <div className="text-left">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">Instant Delivery</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Get your details delivered instantly after verification.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
