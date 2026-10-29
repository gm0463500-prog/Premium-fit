import React from 'react';
import { PageId } from '../types';
import { BRAND_CONFIG, CRAFT_ASSET, HERO_ASSET } from '../config/brandConfig';
import { ArrowRight, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId, productId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Hero Banner */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
          Our Story & Vision
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight leading-tight">
          Redefining Streetwear Comfort in Pakistan.
        </h1>
        <p className="text-base text-slate-600 mt-4 leading-relaxed">
          Premium Fit was born out of a simple frustration: young Pakistanis were searching for authentic, relaxed-fit baggy trousers that delivered real heavyweight quality without excessive imported prices.
        </p>
      </div>

      {/* Grid: Story & Imagery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6 text-sm text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
            Crafted for the Everyday Grind
          </h2>
          <p>
            Whether you are heading to university, spending long hours creating at your desk, or chilling with friends on the weekend, your trousers should never feel restrictive or uncomfortable.
          </p>
          <p>
            We designed our 3 core colorways — <strong>Premium Black</strong>, <strong>Classic Grey</strong>, and <strong>Everyday Navy</strong> — to fit into any wardrobe effortlessly. We chose a tailored baggy silhouette that provides plenty of room around the thighs and hips, falling with a clean, modern aesthetic over any pair of sneakers.
          </p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              The Premium Fit Guarantee
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Fair pricing: Rs. 1,000 per trouser</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Heavyweight 280 GSM breathable combed cotton</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Local Karachi fulfillment with express delivery across Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden aspect-3/4 border border-slate-200 shadow-sm bg-slate-100">
            <img
              src={HERO_ASSET}
              alt="Premium Fit Streetwear Look"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-3/4 border border-slate-200 shadow-sm bg-slate-100 mt-6">
            <img
              src={CRAFT_ASSET}
              alt="Fabric Texture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 3 Core Values */}
      <div className="pt-8 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight text-center mb-10">
          Our Guiding Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Authentic Baggy Fit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Not slim, not tight, and not shapeless. Our cut is meticulously calibrated to drape naturally over sneakers without sagging awkwardly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Uncompromising Fabric</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We source high-grade combed cotton twill that breathes in summer and retains warmth in mild winters, resisting shrinking and fading.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Customer-First Service</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We believe in direct, honest communication via WhatsApp, transparent delivery fees, and 7-day hassle-free size exchanges.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
            Ready to experience the fit?
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Browse our collection and order directly via WhatsApp or Cash on Delivery.
          </p>
        </div>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Shop All 3 Trousers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
