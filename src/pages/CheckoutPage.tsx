import React, { useState } from 'react';
import { PageId, CheckoutFormData, PaymentMethod } from '../types';
import { useCart } from '../context/CartContext';
import { POPULAR_PAKISTAN_CITIES, BRAND_CONFIG } from '../config/brandConfig';
import { WhatsAppOrderModal } from '../components/WhatsAppOrderModal';
import {
  MessageCircle,
  Truck,
  ShieldCheck,
  AlertCircle,
  Banknote,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (page: PageId, productId?: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const {
    items,
    subtotal,
    deliveryCity,
    setDeliveryCity,
    deliveryZone,
    deliveryCharge,
    grandTotal,
    generateWhatsAppOrderUrl,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(deliveryCity);
  const [customCityText, setCustomCityText] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [orderNotes, setOrderNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // WhatsApp Order Confirmation Modal
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    whatsappUrl: string;
    rawMessage: string;
    customerName: string;
  }>({
    isOpen: false,
    whatsappUrl: '',
    rawMessage: '',
    customerName: '',
  });

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 uppercase">Your Cart is Empty</h1>
        <p className="text-xs text-slate-500 mt-2">
          Please add at least one baggy trouser to your bag before proceeding to checkout.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-6 px-6 py-3 bg-[#0A2540] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer uppercase"
        >
          View Collection
        </button>
      </div>
    );
  }

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    setDeliveryCity(newCity);
  };

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }

    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      errs.phone = 'Please enter your mobile phone number.';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid Pakistani phone number (e.g. 0323 1234567).';
    }

    const activeCity = city === 'Other City in Pakistan' ? customCityText.trim() : city.trim();
    if (!activeCity) {
      errs.city = 'Please specify your delivery city.';
    }

    if (!address.trim()) {
      errs.address = 'Please provide your full delivery address including house/street/area.';
    } else if (address.trim().length < 10) {
      errs.address = 'Address appears too short. Please include street, sector/area, and landmark.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    const finalCity = city === 'Other City in Pakistan' ? customCityText.trim() : city.trim();

    const formData: CheckoutFormData = {
      fullName,
      phone,
      city: finalCity,
      address,
      paymentMethod,
      orderNotes,
    };

    // Generate dynamic WhatsApp URL and message strictly following requirements
    const { url, rawMessage } = generateWhatsAppOrderUrl(formData);

    // Open instruction modal so customer is crystal clear they must press "Send" in WhatsApp
    setModalData({
      isOpen: true,
      whatsappUrl: url,
      rawMessage,
      customerName: fullName,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Breadcrumb Header */}
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-700 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shopping Cart</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            Checkout & WhatsApp Order
          </h1>
        </div>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
          Support: <strong className="text-slate-800">{BRAND_CONFIG.phoneDisplay}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-1">
                1. Delivery Information
              </h2>
              <p className="text-xs text-slate-500">
                Please enter your exact Pakistani contact and shipping address for courier dispatch.
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Muhammad Ali"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                    : 'border-slate-300 focus:ring-blue-600'
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mobile Number (with WhatsApp) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="0323 1234567 or +92 3XX XXXXXXX"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                      : 'border-slate-300 focus:ring-blue-600'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Used by courier rider for delivery coordination and order tracking.
              </p>
              {errors.phone && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                City <span className="text-rose-500">*</span>
              </label>
              <select
                value={city}
                onChange={(e) => {
                  handleCityChange(e.target.value);
                  if (errors.city) setErrors({ ...errors, city: '' });
                }}
                className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 ${
                  errors.city
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:ring-blue-600'
                }`}
              >
                {POPULAR_PAKISTAN_CITIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} {c.zone === 'karachi' ? '(Rs. 150 Delivery)' : '(Rs. 250 Delivery)'}
                  </option>
                ))}
              </select>

              {city === 'Other City in Pakistan' && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter your specific city / town in Pakistan"
                    value={customCityText}
                    onChange={(e) => setCustomCityText(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {errors.city && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.city}
                </p>
              )}
            </div>

            {/* Complete Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Complete Delivery Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="House / Apartment number, Street name, Block / Sector / Phase, Landmark..."
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors({ ...errors, address: '' });
                }}
                className={`w-full bg-slate-50 border rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 ${
                  errors.address
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                    : 'border-slate-300 focus:ring-blue-600'
                }`}
              />
              {errors.address && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.address}
                </p>
              )}
            </div>

            {/* Payment Options Section */}
            <div className="pt-4 border-t border-slate-200">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-1">
                2. Select Payment Option
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Choose your preferred payment method below.
              </p>

              <div className="space-y-3">
                
                {/* 1. Cash on Delivery (COD) */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-blue-50/70 border-blue-600 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-blue-700 focus:ring-blue-600 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-900">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        Most Popular
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pay cash to the rider when the package is delivered to your doorstep.
                    </p>
                  </div>
                </label>

                {/* 2. Advance Payment */}
                <label
                  onClick={() => setPaymentMethod('advance')}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'advance'
                      ? 'bg-blue-50/70 border-blue-600 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'advance'}
                    onChange={() => setPaymentMethod('advance')}
                    className="mt-1 text-blue-700 focus:ring-blue-600 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-slate-900">
                        Advance Payment
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Bank Transfer, Nayapay, Sadapay, or JazzCash.
                    </p>
                  </div>
                </label>

                {/* Advance Payment Notice Requirement */}
                {paymentMethod === 'advance' && (
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-blue-950">Advance Payment Notice:</strong>
                      <p className="text-[11px] text-blue-800 mt-0.5">
                        Payment details will be shared by Premium Fit on WhatsApp.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Optional Order Notes */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Order Notes / Special Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please deliver after 3 PM or call before arrival..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Submit Primary Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#1faa50] text-white font-extrabold text-sm uppercase tracking-wide rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Place Order on WhatsApp</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2.5">
                * Generates your order message and connects directly to <strong>{BRAND_CONFIG.phoneDisplay}</strong>.
              </p>
            </div>

          </form>
        </div>

        {/* Right Column: Order Review Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight pb-3 border-b border-slate-200">
              Order Review ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
            </h3>

            {/* Products List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-3 text-xs py-1">
                  <div className="w-14 h-16 bg-white border border-slate-200 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-slate-800 line-clamp-1">{item.product.name}</h4>
                    <span className="text-slate-500 text-[11px]">
                      Size: <strong className="text-blue-800">{item.size}</strong> · Qty: {item.quantity}
                    </span>
                    <span className="text-[#0A2540] font-bold mt-0.5 tabular-nums">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculation summary */}
            <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>
                  Delivery Charges ({city === 'Other City in Pakistan' ? (customCityText || 'Other Cities') : city})
                </span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Rs. {deliveryCharge.toLocaleString()}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                <span>Grand Total</span>
                <span className="text-blue-900 tabular-nums">
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Guarantee Callout */}
            <div className="pt-3 border-t border-slate-200/80 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>100% genuine Pakistani streetwear guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Dispatches via authorized courier partner</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* WhatsApp Modal with Instructions & Direct Send Button */}
      <WhatsAppOrderModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
        whatsappUrl={modalData.whatsappUrl}
        rawMessage={modalData.rawMessage}
        customerName={modalData.customerName}
      />

    </div>
  );
};
