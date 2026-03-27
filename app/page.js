import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductList from "@/components/ProductList";
import HotDealSlider from "@/components/HotDealSlider";
import { getProducts, getSettings } from "@/lib/actions";

export default async function Home() {
  const products = await getProducts();
  const settings = await getSettings();
  const whatsapp = settings?.whatsapp || "919752691095";

  return (
    <div className="flex flex-col gap-16 pb-24">
      <Hero />
      
      <div className="container mx-auto px-4 -mt-32 relative z-20 space-y-24">
        <TrustBadges />

        <HotDealSlider />

        <ProductList initialProducts={products} />

        <WhyChooseUs />

        <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[3rem] border border-white/5 px-8 md:px-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Need a Custom Account?
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
            Looking for something specific? Contact us on WhatsApp and we'll find the perfect account for your needs.
          </p>
          <a 
            href={`https://wa.me/${whatsapp}`} 
            target="_blank"
            className="inline-flex items-center justify-center bg-white text-black text-xl font-black px-12 py-6 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/5"
          >
            Contact Support Now
          </a>
        </section>
      </div>
    </div>
  );
}
