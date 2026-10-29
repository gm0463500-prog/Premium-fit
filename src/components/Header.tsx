import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search, Upload, Check } from 'lucide-react';
import { PageId } from '../types';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brandConfig';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, productId?: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('premium_fit_custom_logo') || BRAND_CONFIG.customLogoUrl || null;
    } catch {
      return null;
    }
  });
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setUploadedLogo(result);
        try {
          localStorage.setItem('premium_fit_custom_logo', result);
        } catch {
          // ignore
        }
        setIsLogoModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    setUploadedLogo(null);
    try {
      localStorage.removeItem('premium_fit_custom_logo');
    } catch {
      // ignore
    }
    setIsLogoModalOpen(false);
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#0A2540] text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="font-semibold text-sky-300">NATIONWIDE DELIVERY:</span>
        <span>Karachi Rs. 150 · Other Cities Rs. 250 · Cash on Delivery & WhatsApp Checkout</span>
      </div>

      {/* Main Header Sticky Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark / Custom Uploaded Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
              aria-label="Premium Fit Home"
            >
              {uploadedLogo ? (
                <img
                  src={uploadedLogo}
                  alt={BRAND_CONFIG.name}
                  className="h-10 w-auto object-contain max-w-[160px]"
                />
              ) : (
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0A2540] group-hover:text-blue-700 transition-colors uppercase">
                    PREMIUM<span className="text-blue-600 font-light">FIT</span>
                  </span>
                  <span className="text-[9px] tracking-[0.25em] text-slate-500 font-semibold uppercase -mt-1">
                    EST. PAKISTAN
                  </span>
                </div>
              )}
            </button>

            {/* Subtle logo upload button for store owner */}
            <button
              onClick={() => setIsLogoModalOpen(true)}
              className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-700 transition-colors px-2 py-1 rounded border border-dashed border-slate-200 hover:border-blue-300 cursor-pointer"
              title="Click to use your own brand logo"
            >
              <Upload className="w-3 h-3" />
              <span>{uploadedLogo ? 'Change Logo' : 'Upload Logo'}</span>
            </button>
          </div>

          {/* Zone 2: 4-5 Concise Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-blue-700 transition-colors cursor-pointer py-1 whitespace-nowrap shrink-0 ${
                currentPage === 'home' ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className={`hover:text-blue-700 transition-colors cursor-pointer py-1 whitespace-nowrap shrink-0 ${
                currentPage === 'shop' ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : ''
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-blue-700 transition-colors cursor-pointer py-1 whitespace-nowrap shrink-0 ${
                currentPage === 'about' ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => onNavigate('faqs')}
              className={`hover:text-blue-700 transition-colors cursor-pointer py-1 whitespace-nowrap shrink-0 ${
                currentPage === 'faqs' ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : ''
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-blue-700 transition-colors cursor-pointer py-1 whitespace-nowrap shrink-0 ${
                currentPage === 'contact' ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Search, Cart Icon & Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Toggle / Input */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-slate-100 rounded-lg px-2.5 py-1.5 w-44 sm:w-60 transition-all border border-slate-300">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search trousers..."
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      if (currentPage !== 'shop') onNavigate('shop');
                    }}
                    autoFocus
                    className="w-full bg-transparent border-none text-xs text-slate-800 placeholder-slate-400 px-2 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 text-slate-800 hover:text-blue-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label={`Shopping Cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-bold text-[11px] h-5 w-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Primary CTA (Desktop) */}
            <button
              onClick={() => onNavigate('shop')}
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#0A2540] hover:bg-blue-700 rounded-lg transition-colors cursor-pointer uppercase"
            >
              Shop Baggy Trousers
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-700 rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search baggy trousers..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentPage !== 'shop') onNavigate('shop');
                }}
                className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'home' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'shop' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Shop All (3 Baggy Trousers)
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'about' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => {
                onNavigate('faqs');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'faqs' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              FAQs & Sizing
            </button>
            <button
              onClick={() => {
                onNavigate('shipping-policy');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'shipping-policy' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Shipping Policy (Karachi Rs. 150 / Nationwide Rs. 250)
            </button>
            <button
              onClick={() => {
                onNavigate('return-policy');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'return-policy' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Return & Exchange Policy
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'contact' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact Us (WhatsApp 03232120211)
            </button>

            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setIsLogoModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs text-center border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                {uploadedLogo ? 'Custom Logo Loaded' : 'Upload Brand Logo'}
              </button>
              <button
                onClick={() => {
                  onNavigate('cart');
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs text-center bg-[#0A2540] text-white rounded-lg font-medium"
              >
                View Cart ({totalItemsCount})
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Brand Logo Upload Modal */}
      {isLogoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Upload Premium Fit Logo</h3>
              <button
                onClick={() => setIsLogoModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Upload your brand's existing Premium Fit logo (PNG, JPG, or SVG with transparent or white background). It will instantly appear across the header and checkout.
            </p>

            <div className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-blue-500 transition-colors bg-slate-50">
              {uploadedLogo ? (
                <div className="text-center">
                  <img
                    src={uploadedLogo}
                    alt="Uploaded Logo"
                    className="h-16 mx-auto object-contain mb-3"
                  />
                  <div className="flex items-center justify-center text-xs text-emerald-700 font-medium gap-1 mb-2">
                    <Check className="w-4 h-4" /> Logo active on website
                  </div>
                </div>
              ) : (
                <Upload className="w-10 h-10 text-slate-400 mb-2" />
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-[#0A2540] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {uploadedLogo ? 'Select Another File' : 'Choose Logo File'}
              </button>
              <span className="text-[11px] text-slate-400 mt-2">Recommended: PNG / SVG with transparent background</span>
            </div>

            {uploadedLogo && (
              <div className="mt-4 flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={handleResetLogo}
                  className="text-xs text-rose-600 hover:underline cursor-pointer"
                >
                  Reset to Default Wordmark
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogoModalOpen(false)}
                  className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
