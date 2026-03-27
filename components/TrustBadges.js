import { ShieldCheck, Zap, MessageCircle } from 'lucide-react'

const badges = [
  {
    icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    title: "Verified Accounts",
    description: "Every account is hand-picked and verified for security."
  },
  {
    icon: <Zap className="w-12 h-12 text-secondary" />,
    title: "Safe & Manual Deals",
    description: "Manual handling ensures 100% transparency and safety."
  },
  {
    icon: <MessageCircle className="w-12 h-12 text-primary" />,
    title: "Instant Support",
    description: "Direct WhatsApp contact for quick query resolution."
  }
]

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
      {badges.map((badge, index) => (
        <div 
          key={index}
          className="bg-accent/30 border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-all hover:bg-accent/50 group"
        >
          <div className="mb-6 bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            {badge.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
            {badge.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  )
}
