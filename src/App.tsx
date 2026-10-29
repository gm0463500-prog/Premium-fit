/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnPolicyPage } from './pages/ReturnPolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('premium-black-baggy-trouser');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Sync hash routing on load & popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash.startsWith('product/')) {
        const pId = hash.replace('product/', '');
        setSelectedProductId(pId);
        setCurrentPage('product-detail');
      } else if (
        [
          'home',
          'shop',
          'cart',
          'checkout',
          'about',
          'contact',
          'faqs',
          'shipping-policy',
          'return-policy',
          'privacy-policy',
        ].includes(hash)
      ) {
        setCurrentPage(hash as PageId);
      }
    };

    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
      window.location.hash = `#/product/${productId}`;
    } else {
      window.location.hash = `#/${page}`;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />
        );
      case 'shop':
        return (
          <ShopPage
            onNavigate={handleNavigate}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigate={handleNavigate}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />
        );
      case 'cart':
        return (
          <CartPage
            onNavigate={handleNavigate}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />
        );
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'faqs':
        return (
          <FAQPage
            onNavigate={handleNavigate}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />
        );
      case 'shipping-policy':
        return <ShippingPolicyPage onNavigate={handleNavigate} />;
      case 'return-policy':
        return <ReturnPolicyPage onNavigate={handleNavigate} />;
      case 'privacy-policy':
        return <PrivacyPolicyPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-900 selection:text-white">
        {/* Navigation Bar */}
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1">{renderCurrentPage()}</main>

        {/* Slide-over Cart Drawer */}
        <CartDrawer onNavigate={handleNavigate} />

        {/* Global Sizing Modal */}
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />

        {/* 11-page Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </CartProvider>
  );
}
