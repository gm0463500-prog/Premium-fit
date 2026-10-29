import React from 'react';
import { PageId } from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';
import { MessageCircle, Phone, Mail, MapPin, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId, productId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-slate-800">
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-800/80 bg-[#071324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-900/40 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/50">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Nationwide Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Karachi: Rs. 150 (1-2 days) · Other Cities: Rs. 250 (2-4 days)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-900/40 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/50">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">7-Day Hassle-Free Exchange</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Easy size replacement via WhatsApp customer support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-900/40 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Cash on Delivery & Advance</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Pay safely at your doorstep or arrange advance transfer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white uppercase">
                PREMIUM<span className="text-blue-400 font-light">FIT</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-blue-300 font-medium uppercase mt-0.5">
                Baggy Trousers · Pakistan
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premium Fit is an authentic Pakistani streetwear brand dedicated to crafting relaxed, comfortable, and durable baggy trousers for modern youth. Flat price of Rs. 1,000 with swift delivery across Pakistan.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-xs text-slate-300">
              <a
                href={`https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hello Premium Fit, I have an inquiry regarding your baggy trousers.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {BRAND_CONFIG.phoneDisplay} ({BRAND_CONFIG.whatsappInternational})</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{BRAND_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{BRAND_CONFIG.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Shop */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('product-detail', 'premium-black-baggy-trouser')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Premium Black Trouser (Rs. 1,000)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('product-detail', 'classic-grey-baggy-trouser')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Classic Grey Trouser (Rs. 1,000)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('product-detail', 'everyday-navy-baggy-trouser')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Everyday Navy Trouser (Rs. 1,000)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left font-medium"
                >
                  View All 3 Trousers →
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('shipping-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('return-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Return & Exchange Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faqs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Cart & Ordering */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Order & Information
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('cart')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shopping Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('checkout')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Checkout (WhatsApp & COD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Premium Fit
                </button>
              </li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hi, I need assistance with sizing for Premium Fit baggy trousers.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded text-xs hover:bg-emerald-600/30 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Sizing Help</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Premium Fit Pakistan. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Karachi Delivery: Rs. 150</span>
            <span>·</span>
            <span>Nationwide: Rs. 250</span>
            <span>·</span>
            <span className="text-slate-400 font-medium">WhatsApp: 03232120211</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
