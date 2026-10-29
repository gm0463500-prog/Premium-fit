import React from 'react';
import { PageId } from '../types';
import { PRODUCTS, BRAND_CONFIG, HERO_ASSET, CRAFT_ASSET } from '../config/brandConfig';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Feather, Layers, Scissors, MessageCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, productId?: string) => void;
  onOpenSizeGuide: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSizeGuide }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and Call-to-Actions */}
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pakistani Streetwear Collection · Flat Rs. 1,000</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08] text-balance">
                Upgrade Your <br />
                <span className="text-blue-400">Everyday Style.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Discover comfortable and stylish baggy trousers designed for your everyday look.
                Tailored with breathable cotton twill, relaxed street drape, and nationwide delivery across Pakistan.
              </p>

              {/* Price Callout & CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide uppercase rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hello Premium Fit! I want to order baggy trousers (Rs. 1,000).')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm tracking-wide rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-xs text-slate-400">
                <div>
                  <div className="font-extrabold text-white text-base tabular-nums">Rs. 1,000</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Flat Price Per Trouser</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-base">Karachi Rs. 150</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Nationwide Rs. 250</div>
                </div>
                <div>
                  <div className="font-extrabold text-white text-base">S, M, L, XL</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">True Baggy Fit</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero High-Fashion Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 lg:aspect-3/4 rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-800">
                <img
                  src={HERO_ASSET}
                  alt="Premium Fit Baggy Trouser Streetwear"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Floating Product Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white uppercase tracking-wider block">Signature Baggy Cut</span>
                    <span className="text-slate-400 text-[11px]">Heavyweight Breathable Cotton</span>
                  </div>
                  <span className="text-blue-400 font-extrabold text-sm tabular-nums">
                    Rs. 1,000
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
              Curated Everyday Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              Featured Baggy Trousers
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select your color, choose your size, and order instantly with Cash on Delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSizeGuide}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline cursor-pointer"
            >
              View Size Guide (S – XL)
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Shop All
            </button>
          </div>
        </div>

        {/* 3 Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={(id) => onNavigate('product-detail', id)}
              onOpenSizeGuide={onOpenSizeGuide}
            />
          ))}
        </div>
      </section>

      {/* 3. Why Choose Premium Fit Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
              The Premium Fit Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              Why Choose Premium Fit?
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              We started Premium Fit in Karachi with one mission: to make authentic, heavyweight baggy streetwear trousers accessible to every Pakistani youth without the luxury markup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Heavyweight Cotton Twill
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Woven with premium 280 GSM combed cotton. Provides a crisp, structured street drape while remaining breathable in Pakistan's warm climate.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Relaxed Baggy Silhouette
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailored with roomy thigh and calf measurements and a clean hem break that drops effortlessly over sneakers and slides.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Comfort Elastic Waist
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Elasticated waistband with durable reinforced drawcords. Easily adjusts across 2–3 waist sizes for a snug or slouchy fit.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Nationwide COD Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reliable delivery across Karachi (Rs. 150) and all other cities in Pakistan (Rs. 250). Pay safely in cash when your parcel arrives.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Fabric & Craftsmanship Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A2540] rounded-2xl overflow-hidden text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
                Crafted For Everyday Durability
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
                Quality You Can Feel In Every Stitch.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Most fast-fashion trousers thin out or lose their shape after three washes. At Premium Fit, we use pre-shrunk, double-stitched combed cotton twill with deep reinforced pockets designed to securely hold large smartphones.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="font-bold text-white text-sm">Deep Pockets</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">2 Front Slants + 1 Back Welt</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="font-bold text-white text-sm">Durable Gusset</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">Reinforced crotch seam</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-6 py-3 bg-white text-[#0A2540] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Explore All 3 Colors
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 h-72 sm:h-96 lg:h-full min-h-[340px]">
              <img
                src={CRAFT_ASSET}
                alt="Premium Fit Combed Cotton Twill Weave"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. Shopping Call-To-Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-14 space-y-6">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
            Ready to Upgrade Your Fit?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
            Rs. 1,000 Flat. Available in S, M, L, XL.
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Order your favorite color today. Quick checkout on WhatsApp or pay Cash on Delivery at your door.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0A2540] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Shop Baggy Trousers
            </button>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hello Premium Fit, I want to inquire about trouser sizing and delivery.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#1faa50] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
