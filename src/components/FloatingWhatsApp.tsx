import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

  const defaultMessage = encodeURIComponent(
    'Assalam-o-Alaikum Premium Fit! I am interested in your baggy trousers (Rs. 1,000). Can you assist me?'
  );
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Callout */}
      {!isTooltipDismissed && (
        <div className="mb-2 bg-white text-slate-800 text-xs py-2 px-3 rounded-lg shadow-xl border border-slate-200 max-w-[210px] relative animate-bounce flex items-start gap-2">
          <div>
            <p className="font-semibold text-blue-900">Need help or want to order?</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Chat with us on WhatsApp!</p>
          </div>
          <button
            onClick={() => setIsTooltipDismissed(true)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="Dismiss chat tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
        aria-label="Order or Chat on WhatsApp with Premium Fit"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline-block font-semibold text-xs tracking-wide">
          Order on WhatsApp
        </span>
      </a>
    </div>
  );
};
