import React from 'react';
import { PageId } from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';
import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageId) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
          Data Protection
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Your privacy is important to us at Premium Fit Pakistan. Learn how we handle your order information.
        </p>
      </div>

      {/* Grid Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <Lock className="w-5 h-5 text-blue-700" />
          <h3 className="text-sm font-bold text-slate-900">Encrypted Communications</h3>
          <p className="text-xs text-slate-600">
            WhatsApp conversations and order details are end-to-end encrypted by WhatsApp.
          </p>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <EyeOff className="w-5 h-5 text-blue-700" />
          <h3 className="text-sm font-bold text-slate-900">Zero Selling of Data</h3>
          <p className="text-xs text-slate-600">
            We never sell, rent, or lease your phone number or shipping address to third-party advertisers.
          </p>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <Server className="w-5 h-5 text-blue-700" />
          <h3 className="text-sm font-bold text-slate-900">Delivery-Only Usage</h3>
          <p className="text-xs text-slate-600">
            Customer details are shared exclusively with courier riders for doorstep package delivery.
          </p>
        </div>
      </div>

      {/* Policy Details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-600 leading-relaxed">
        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            1. Information We Collect
          </h2>
          <p>
            When you place an order or contact us via WhatsApp, we collect the necessary details required to deliver your baggy trousers: your full name, Pakistani mobile contact number, delivery city, and exact street address.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            2. Local Storage Usage
          </h2>
          <p>
            Our website uses browser <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">localStorage</code> to remember your shopping cart items and chosen city so your selections remain intact if you refresh the browser page. No sensitive banking credentials are saved in your browser.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            3. Third-Party Courier Disclosures
          </h2>
          <p>
            Your delivery address and phone number are provided to our trusted courier delivery partners (Trax, Leopard, Call Courier) strictly for the purpose of shipping your parcel and calling you upon arrival.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            4. Customer Contact Rights
          </h2>
          <p>
            If you wish to update or delete any historical contact records from our order registry, simply send a request to our WhatsApp support at <strong>{BRAND_CONFIG.phoneDisplay}</strong> or email us at <strong>{BRAND_CONFIG.email}</strong>.
          </p>
        </div>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 bg-[#0A2540] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
        >
          Return to Home
        </button>
      </div>

    </div>
  );
};
