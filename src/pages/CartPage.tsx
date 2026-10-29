import React from 'react';
import { PageId, ProductSize } from '../types';
import { useCart } from '../context/CartContext';
import { POPULAR_PAKISTAN_CITIES, BRAND_CONFIG } from '../config/brandConfig';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';

interface CartPageProps {
  onNavigate: (page: PageId, productId?: string) => void;
  onOpenSizeGuide: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    updateItemSize,
    clearCart,
    subtotal,
    deliveryCity,
    setDeliveryCity,
    deliveryZone,
    deliveryCharge,
    grandTotal,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 uppercase">Your Cart is Empty</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
          Looks like you haven't added any baggy trousers to your cart yet. Choose your favorite fit and order with Cash on Delivery.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-6 px-8 py-3.5 bg-[#0A2540] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
        >
          Browse Baggy Trousers (Rs. 1,000)
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-700 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
            Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Cart Items Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 sm:p-6 divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.cartItemId} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5">
                
                {/* Product Image */}
                <div
                  onClick={() => onNavigate('product-detail', item.product.id)}
                  className="w-24 h-28 sm:w-28 sm:h-32 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shrink-0 cursor-pointer"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          onClick={() => onNavigate('product-detail', item.product.id)}
                          className="text-base font-bold text-slate-900 hover:text-blue-700 cursor-pointer transition-colors"
                        >
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Color: {item.product.colorName} · Relaxed Baggy Cut
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Size Selector */}
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-700">Size:</span>
                      <div className="flex gap-1.5">
                        {(['S', 'M', 'L', 'XL'] as ProductSize[]).map((sz) => (
                          <button
                            key={sz}
                            onClick={() => updateItemSize(item.cartItemId, sz)}
                            className={`px-2.5 py-1 text-xs font-bold rounded border transition-colors cursor-pointer ${
                              item.size === sz
                                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={onOpenSizeGuide}
                        className="text-[11px] text-blue-700 hover:underline cursor-pointer"
                      >
                        Size Guide
                      </button>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-l-lg transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-r-lg transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">
                        Rs. {item.product.price.toLocaleString()} × {item.quantity}
                      </span>
                      <span className="text-sm font-extrabold text-[#0A2540] tabular-nums">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary & City Delivery Calculator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight pb-3 border-b border-slate-200">
              Order Summary
            </h2>

            {/* City Delivery Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Select Delivery Destination:
              </label>
              <select
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                {POPULAR_PAKISTAN_CITIES.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name} {city.zone === 'karachi' ? '(Rs. 150 Delivery)' : '(Rs. 250 Delivery)'}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">
                {deliveryZone === 'karachi'
                  ? '⚡ Karachi local express courier: Rs. 150 (1-2 days)'
                  : '🚚 Nationwide courier delivery: Rs. 250 (2-4 working days)'}
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 pt-3 border-t border-slate-200 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges ({deliveryCity})</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  Rs. {deliveryCharge.toLocaleString()}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                <span>Total Amount</span>
                <span className="text-blue-900 tabular-nums">
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-4 px-6 bg-[#0A2540] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 border-t border-slate-200/80 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Cash on Delivery & Advance Payment via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>All cart changes saved in your browser</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
