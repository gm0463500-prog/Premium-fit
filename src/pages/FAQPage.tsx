import React, { useState } from 'react';
import { PageId } from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: PageId) => void;
  onOpenSizeGuide: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What makes Premium Fit baggy trousers different from regular trousers?',
      answer:
        'Our baggy trousers feature an authentic streetwear cut engineered with generous volume around the thighs, knees, and calf, with an intentional hem break that drops effortlessly over sneakers. Unlike flimsy fast-fashion sweatpants, we use durable, 280 GSM combed cotton twill that holds its relaxed structure throughout the day.',
    },
    {
      question: 'What are the delivery charges across Pakistan?',
      answer:
        'Delivery within Karachi is Rs. 150 (delivered in 1–2 working days). For all other cities across Pakistan (including Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and beyond), delivery is Rs. 250 (delivered in 2–4 working days).',
    },
    {
      question: 'How do I choose the correct size?',
      answer:
        'We offer 4 sizes: S (28"–30" waist), M (31"–33" waist), L (34"–36" waist), and XL (37"–40" waist). All our trousers feature an elasticated waistband with a reinforced drawcord that flexes comfortably. If you prefer an extra-baggy skate look, we recommend sizing up one size.',
    },
    {
      question: 'How does WhatsApp checkout work?',
      answer:
        'When you fill in your details on our checkout page and click "Place Order on WhatsApp", your browser or phone will automatically open WhatsApp with a neatly formatted order summary sent to our official number 03232120211. All you have to do is press "Send" in WhatsApp! Our team will immediately acknowledge and dispatch your parcel.',
    },
    {
      question: 'What payment options do you support?',
      answer:
        'We offer Cash on Delivery (COD) nationwide, where you pay the courier rider when your parcel arrives at your doorstep. We also support Advance Payment via Bank Transfer, Nayapay, Sadapay, or JazzCash (our team will provide account details directly on WhatsApp after your order is received).',
    },
    {
      question: 'What if the size does not fit? Can I exchange?',
      answer:
        'Yes! We offer a 7-day hassle-free size exchange policy. If your trouser is unworn, unwashed, and has its original tags attached, simply message us on WhatsApp at 03232120211 with your order name and desired replacement size. We will arrange the exchange with our courier.',
    },
    {
      question: 'How should I wash and care for my baggy trousers?',
      answer:
        'We recommend gentle machine wash in cold water with similar dark colors. Hang to dry in the shade to prevent sun fading. Do not bleach. Warm iron on reverse if desired.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
          Frequently Asked Questions
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
          Everything You Need to Know
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Got questions regarding baggy trousers, sizing, shipping to your city, or WhatsApp orders? Find answers below.
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={onOpenSizeGuide}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
          >
            Check Sizing Chart (S, M, L, XL)
          </button>
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp Help CTA */}
      <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
        <h3 className="text-base font-bold text-emerald-950">
          Still have a question?
        </h3>
        <p className="text-xs text-emerald-800 max-w-md mx-auto">
          Our customer support representative is online on WhatsApp to answer your custom queries, fit checks, or delivery tracking.
        </p>
        <a
          href={`https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hello Premium Fit, I have a question not listed in the FAQs.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1faa50] text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Chat on WhatsApp ({BRAND_CONFIG.phoneDisplay})</span>
        </a>
      </div>

    </div>
  );
};
