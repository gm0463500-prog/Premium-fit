import React from 'react';
import { PageId } from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';
import { RefreshCw, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface ReturnPolicyPageProps {
  onNavigate: (page: PageId) => void;
}

export const ReturnPolicyPage: React.FC<ReturnPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
          Customer Satisfaction
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
          Return and Exchange Policy
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          We want you to feel 100% confident in your baggy trouser fit. If you need a size exchange, we make it simple and quick.
        </p>
      </div>

      {/* Policy Highlights */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">7-Day Hassle-Free Size Exchange</h2>
            <p className="text-xs text-slate-600">
              Exchange your trouser for another size (S, M, L, XL) within 7 days of parcel delivery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Exchange for smaller or larger size with zero hassle.</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Color swaps allowed subject to stock availability.</span>
          </div>
        </div>
      </div>

      {/* Exchange Conditions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-600 leading-relaxed">
        <div>
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            1. Eligibility Criteria for Exchange
          </h3>
          <p className="mb-2">To qualify for a size replacement or return exchange:</p>
          <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
              <span>The request must be initiated within 7 days from the delivery date.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
              <span>The trouser must be unworn, unwashed, unaltered, and without body scent or perfume.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
              <span>All original brand tags, inner labels, and protective polybag packaging must be intact.</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            2. How to Request an Exchange via WhatsApp
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-xs">
            <li>
              Send a message to our official WhatsApp support number: <strong>{BRAND_CONFIG.phoneDisplay}</strong> ({BRAND_CONFIG.whatsappInternational}).
            </li>
            <li>
              Provide your customer name, phone number, and a photo of the received trouser with tags.
            </li>
            <li>
              Specify the replacement size you wish to receive (S, M, L, XL).
            </li>
            <li>
              Our team will arrange courier pickup or reverse shipment instructions. Once the return parcel is inspected at our Karachi facility, your fresh replacement size will be dispatched immediately.
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            3. Exchange Courier Fees
          </h3>
          <p className="text-xs">
            If an exchange is requested due to a sizing preference, a standard return courier fee applies (Karachi Rs. 150 / other cities Rs. 250). In the unlikely event that you received a damaged item or incorrect color, Premium Fit will bear all replacement shipping expenses.
          </p>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="text-center pt-2">
        <a
          href={`https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hello Premium Fit, I would like to inquire about an exchange for my order.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1faa50] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Contact WhatsApp Exchange Desk ({BRAND_CONFIG.phoneDisplay})</span>
        </a>
      </div>

    </div>
  );
};
