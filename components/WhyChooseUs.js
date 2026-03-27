import { ShieldCheck, MessageCircle, Mail, Instagram, Star, Heart, Zap, User, MousePointerClick, CheckCircle2 } from 'lucide-react'

const reasons = [
  {
    icon: <User className="w-6 h-6" />,
    title: "Trusted Seller",
    description: "Highly rated marketplace with zero-risk policy."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Manual Safe Delivery",
    description: "Every account transfer is handled manually for security."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "No Middleman",
    description: "Direct deal with us to save your time and money."
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Fast Response",
    description: "Instant reply on WhatsApp and email for your queries."
  }
]

const steps = [
  {
    icon: <MousePointerClick className="w-6 h-6" />,
    title: "1. Select Product",
    description: "Browse our premium accounts or cheats collection."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "2. Click Buy",
    description: "Hit the buy button to start your purchase."
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "3. WhatsApp Us",
    description: "You'll be redirected to our secure WhatsApp line."
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "4. Safe Deal",
    description: "Complete your manual deal safely with our team."
  }
]

export default function WhyChooseUs() {
  return (
    <div className="space-y-32">
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Getting your dream gaming assets is simple and safe with VaultHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-primary/30 transition-all hover:bg-white/10"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform group-hover:bg-secondary/20">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Why Choose VaultHub?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We are dedicated to providing the safest and most reliable gaming assets for enthusiasts worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-secondary/30 transition-all hover:bg-white/10"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform group-hover:bg-primary/30">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
