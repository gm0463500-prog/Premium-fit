import React, { useState } from 'react';
import { PageId, ProductSize } from '../types';
import { PRODUCTS, BRAND_CONFIG } from '../config/brandConfig';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, Check, RefreshCcw } from 'lucide-react';

interface ShopPageProps {
  onNavigate: (page: PageId, productId?: string) => void;
  onOpenSizeGuide: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigate,
  onOpenSizeGuide,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');

  // Filter products based on search, color, and size
  const filteredProducts = PRODUCTS.filter((product) => {
    // Search filter
    const matchesSearch =
      !searchQuery.trim() ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.colorName.toLowerCase().includes(searchQuery.toLowerCase());

    // Color filter
    const matchesColor =
      selectedColor === 'all' || product.colorName.toLowerCase().includes(selectedColor.toLowerCase());

    // Size filter
    const matchesSize =
      selectedSizeFilter === 'all' ||
      product.availableSizes.includes(selectedSizeFilter as ProductSize);

    return matchesSearch && matchesColor && matchesSize;
  });

  const handleResetFilters = () => {
    setSelectedColor('all');
    setSelectedSizeFilter('all');
    onSearchChange('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
            Official Catalog · Pakistan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
            Baggy Trousers Collection
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Explore all 3 signature colorways. Flat price of Rs. 1,000 per trouser with fast delivery to Karachi (Rs. 150) and nationwide (Rs. 250).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSizeGuide}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
          >
            Sizing Chart (S, M, L, XL)
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Color filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-700" />
            <span>Color:</span>
          </span>
          <button
            onClick={() => setSelectedColor('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedColor === 'all'
                ? 'bg-[#0A2540] text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Colors
          </button>
          <button
            onClick={() => setSelectedColor('black')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedColor === 'black'
                ? 'bg-[#0A2540] text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-black inline-block border border-slate-300" />
            <span>Black</span>
          </button>
          <button
            onClick={() => setSelectedColor('grey')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedColor === 'grey'
                ? 'bg-[#0A2540] text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block border border-slate-300" />
            <span>Grey</span>
          </button>
          <button
            onClick={() => setSelectedColor('navy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedColor === 'navy'
                ? 'bg-[#0A2540] text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a] inline-block border border-slate-300" />
            <span>Navy</span>
          </button>
        </div>

        {/* Size Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700 mr-2">Size:</span>
          <button
            onClick={() => setSelectedSizeFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedSizeFilter === 'all'
                ? 'bg-[#0A2540] text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Sizes
          </button>
          {(['S', 'M', 'L', 'XL'] as ProductSize[]).map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSizeFilter(sz)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedSizeFilter === sz
                  ? 'bg-[#0A2540] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {sz}
            </button>
          ))}

          {(selectedColor !== 'all' || selectedSizeFilter !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="ml-auto text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Active Search Notification */}
      {searchQuery && (
        <div className="text-xs text-slate-500">
          Showing search results for <span className="font-semibold text-slate-800">"{searchQuery}"</span>
        </div>
      )}

      {/* Product List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No trousers match your filter criteria.</p>
          <button
            onClick={handleResetFilters}
            className="mt-3 px-4 py-2 bg-[#0A2540] text-white text-xs font-semibold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={(id) => onNavigate('product-detail', id)}
              onOpenSizeGuide={onOpenSizeGuide}
            />
          ))}
        </div>
      )}

      {/* Trust Reminder */}
      <div className="mt-12 p-6 bg-blue-50/60 rounded-xl border border-blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-blue-900 block text-sm">Need help with sizing or custom bulk orders?</span>
          <span className="text-blue-700">Message our customer support directly on WhatsApp for real-time fitting assistance.</span>
        </div>
        <a
          href={`https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hello Premium Fit, I need help selecting the right size for baggy trousers.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#1faa50] transition-colors shrink-0"
        >
          Chat on WhatsApp ({BRAND_CONFIG.phoneDisplay})
        </a>
      </div>

    </div>
  );
};
