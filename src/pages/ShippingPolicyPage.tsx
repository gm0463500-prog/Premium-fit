import React from 'react';
import { PageId } from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';
import { Truck, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ShippingPolicyPageProps {
  onNavigate: (page: PageId) => void;
}

export const ShippingPolicyPage: React.FC<ShippingPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
          Delivery & Logistics
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Transparent rates and reliable nationwide dispatch for Premium Fit customers across Pakistan.
        </p>
      </div>

      {/* Delivery Rates Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Karachi */}
        <div className="p-6 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              Karachi Delivery
            </span>
            <span className="text-xl font-black text-blue-950 tabular-nums">Rs. 150</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Local Express Courier</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Delivered directly to your door within <strong>1 to 2 working days</strong>. Our Karachi rider will call before arriving.
          </p>
          <div className="text-[11px] text-blue-700 font-semibold flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cash on Delivery available</span>
          </div>
        </div>

        {/* Other Cities */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Nationwide Delivery
            </span>
            <span className="text-xl font-black text-slate-900 tabular-nums">Rs. 250</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Other Cities in Pakistan</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Delivered across Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and all other cities in <strong>2 to 4 working days</strong>.
          </p>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Over 200+ Pakistani cities & towns served</span>
          </div>
        </div>

      </div>

      {/* Detailed Shipping Info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-600 leading-relaxed">
        
        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            1. Order Processing Timeline
          </h2>
          <p>
            All orders confirmed before 3:00 PM PKT (Monday through Saturday) are packed and dispatched on the same day from our Karachi facility. Orders placed on Sundays or public holidays are processed on the subsequent working day.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            2. Courier Partners & Tracking
          </h2>
          <p>
            We partner with reliable Pakistani courier services including Trax, Call Courier, and Leopard Courier. Once your order has been dispatched from Karachi, our team provides your unique tracking consignment number directly on WhatsApp so you can monitor your parcel in real-time.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            3. Cash on Delivery (COD) Procedure
          </h2>
          <p>
            For Cash on Delivery orders, please ensure someone is available at your shipping address with the exact cash amount (subtotal + delivery fee) ready. The courier rider will hand over the sealed parcel upon receiving the payment.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2">
            4. Delivery Inquiries & Delays
          </h2>
          <p>
            In rare cases of extreme weather, strikes, or regional courier delays, deliveries may require an additional 24–48 hours. If you need urgent assistance with your shipment, message our WhatsApp helpline at <strong>{BRAND_CONFIG.phoneDisplay}</strong> with your customer name.
          </p>
        </div>

      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 bg-[#0A2540] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
        >
          Browse Baggy Trousers (Rs. 1,000)
        </button>
      </div>

    </div>
  );
};
