import React, { useState } from 'react';
import { PageId, ProductSize } from '../types';
import { PRODUCTS, BRAND_CONFIG } from '../config/brandConfig';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  Ruler,
  Plus,
  Minus,
  MessageCircle,
  ArrowLeft,
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: PageId, productId?: string) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
  onOpenSizeGuide,
}) => {
  const { addToCart, setIsCartDrawerOpen } = useCart();
  
  // Find current product or default to first
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    setIsCartDrawerOpen(false);
    onNavigate('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Back button breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-1 hover:text-blue-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>
        <span>/</span>
        <span className="text-slate-800 font-medium">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Product Media Gallery (Sticky on desktop) */}
        <div className="lg:col-span-7 sticky top-24">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs relative aspect-4/3 w-full">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-[#0A2540] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                Premium Baggy Fit
              </span>
              <span className="bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                In Stock
              </span>
            </div>

            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 shadow-sm flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                style={{ backgroundColor: product.colorHex }}
              />
              <span>{product.colorName}</span>
            </div>
          </div>

          {/* Color Switcher Bar below image */}
          <div className="mt-4 flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs font-semibold text-slate-700">Available Colors:</span>
            <div className="flex items-center gap-3">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onNavigate('product-detail', p.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                    p.id === product.id
                      ? 'bg-white border-blue-600 shadow-xs text-blue-900 font-bold'
                      : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                    style={{ backgroundColor: p.colorHex }}
                  />
                  <span>{p.colorName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
              Premium Streetwear · Everyday Cut
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              SKU: PF-{product.id.substring(0, 8).toUpperCase()} · Unisex Relaxed Baggy
            </p>
          </div>

          {/* Pricing Row */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-black text-[#0A2540] tabular-nums">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-slate-400 line-through tabular-nums">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
              Fixed Launch Price
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">
                Select Size: <span className="text-blue-700 font-extrabold">{selectedSize}</span>
              </span>
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold cursor-pointer underline"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Chart (Inches)</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedSize === size
                      ? 'bg-[#0A2540] text-white border-[#0A2540] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Quantity:</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-l-lg transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-r-lg transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-500">
                Total:{' '}
                <strong className="text-slate-900 tabular-nums">
                  Rs. {(product.price * quantity).toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          {/* Action CTAs: Add to Cart and Buy Now */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                addedNotice
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {quantity}x ({selectedSize}) to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 bg-[#0A2540] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-amber-400" />
              <span>Buy Now · Fast Checkout</span>
            </button>
          </div>

          {/* Direct WhatsApp Ordering */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center justify-between">
            <div className="text-xs text-emerald-900">
              <span className="font-bold block">Prefer ordering directly on WhatsApp?</span>
              <span className="text-[11px] text-emerald-700">Chat with customer support directly.</span>
            </div>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent(
                `Hi Premium Fit, I want to order the ${product.name} in size ${selectedSize} (Quantity: ${quantity}). Price: Rs. ${product.price * quantity}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#25D366] text-white text-xs font-bold rounded-lg hover:bg-[#1faa50] transition-colors flex items-center gap-1.5 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Delivery & Assurance Details */}
          <div className="pt-4 border-t border-slate-200 space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-blue-700 shrink-0" />
              <span>
                <strong>Karachi:</strong> Rs. 150 (1-2 days) · <strong>Nationwide:</strong> Rs. 250 (2-4 days)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Cash on Delivery (COD) & Advance Payment accepted</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-blue-700 shrink-0" />
              <span>7 Days Size Exchange Guarantee</span>
            </div>
          </div>

          {/* Product Specifications Table */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Product Specifications
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Fabric</span>
                <span className="font-semibold text-slate-800">{product.fabric}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Fit Type</span>
                <span className="font-semibold text-slate-800">{product.fit}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Pockets</span>
                <span className="font-semibold text-slate-800">2 Deep Slant + 1 Rear</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Care</span>
                <span className="font-semibold text-slate-800">Cold Machine Wash</span>
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="pt-2 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Details</h4>
            <ul className="space-y-1 text-xs text-slate-600">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
