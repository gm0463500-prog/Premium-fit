import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageId, ProductSize } from '../types';
import { POPULAR_PAKISTAN_CITIES } from '../config/brandConfig';

interface CartDrawerProps {
  onNavigate: (page: PageId) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    updateItemSize,
    subtotal,
    deliveryCity,
    setDeliveryCity,
    deliveryZone,
    deliveryCharge,
    grandTotal,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    onNavigate('checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    onNavigate('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-700" />
              <h2 className="text-base font-bold text-slate-900">
                Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                  Discover our signature baggy trousers crafted with premium cotton for everyday comfort.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onNavigate('shop');
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#0A2540] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer uppercase"
                >
                  Explore Baggy Trousers
                </button>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 py-3 group">
                    {/* Item Image */}
                    <div className="w-20 h-24 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-900 leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          Rs. {item.product.price.toLocaleString()} each
                        </div>

                        {/* Size Switcher */}
                        <div className="flex items-center gap-1.5 mt-2 text-xs">
                          <span className="text-slate-500 text-[11px]">Size:</span>
                          <div className="flex gap-1">
                            {(['S', 'M', 'L', 'XL'] as ProductSize[]).map((sz) => (
                              <button
                                key={sz}
                                onClick={() => updateItemSize(item.cartItemId, sz)}
                                className={`px-1.5 py-0.5 text-[10px] font-semibold rounded border ${
                                  item.size === sz
                                    ? 'bg-[#0A2540] text-white border-[#0A2540]'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {sz}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper & Line Total */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                        <div className="flex items-center border border-slate-200 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded-l-md"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600 rounded-r-md"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#0A2540] tabular-nums">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Order Calculation */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Delivery City Selector */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-slate-700">Calculate Delivery:</span>
                  <span className="text-[11px] font-bold text-blue-700">
                    {deliveryZone === 'karachi' ? 'Karachi (Rs. 150)' : 'Other Cities (Rs. 250)'}
                  </span>
                </div>
                <select
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                >
                  {POPULAR_PAKISTAN_CITIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} {c.zone === 'karachi' ? '(Rs. 150 Delivery)' : '(Rs. 250 Delivery)'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 tabular-nums">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery ({deliveryCity})</span>
                  <span className="font-semibold text-slate-800 tabular-nums">
                    Rs. {deliveryCharge.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Estimated Total</span>
                  <span className="text-blue-800 tabular-nums">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 px-4 bg-[#0A2540] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wide rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleViewCart}
                  className="w-full py-2 text-center text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  View Full Cart Page
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                Nationwide Cash on Delivery & Advance Payment via WhatsApp
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
