import React, { useState } from 'react';
import { Product, ProductSize } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Check, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewProduct: (productId: string) => void;
  onOpenSizeGuide?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onOpenSizeGuide,
}) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      onClick={() => onViewProduct(product.id)}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-[#0A2540] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
            Best Seller
          </span>
          <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            In Stock
          </span>
        </div>

        {/* Color Swatch Dot */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2 py-1 rounded text-[11px] text-slate-700 font-medium shadow-xs">
          <span
            className="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block"
            style={{ backgroundColor: product.colorHex }}
          />
          <span>{product.colorName}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="text-[11px] text-slate-500 font-medium mb-1.5">
            <span>Baggy Streetwear</span>
            <span className="mx-1.5">·</span>
            <span>Unisex Relaxed</span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-[#0A2540] tabular-nums">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-[11px] text-emerald-600 font-semibold ml-auto">
              Flat Price
            </span>
          </div>

          {/* Size Selector */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-slate-700">Select Size:</span>
              {onOpenSizeGuide && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSizeGuide();
                  }}
                  className="text-blue-700 hover:text-blue-900 underline text-[11px] cursor-pointer"
                >
                  Size Guide
                </button>
              )}
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#0A2540] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added ({selectedSize})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product.id);
            }}
            className="flex items-center justify-center gap-1 py-2.5 px-3 bg-[#0A2540] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
