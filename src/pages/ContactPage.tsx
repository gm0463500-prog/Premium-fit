import React, { useState } from 'react';
import { PageId } from '../types';
import { BRAND_CONFIG } from '../config/brandConfig';
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Build WhatsApp message
    const formatted = `PREMIUM FIT — CUSTOMER INQUIRY\n\nName: ${name.trim()}\nPhone: ${phone.trim() || 'Not specified'}\nMessage: ${message.trim()}`;
    const url = `https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent(formatted)}`;

    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="max-w-2xl">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
          Customer Support & Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase tracking-tight">
          Contact Premium Fit
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Have a question about trouser sizing, delivery timeline, or placing a customized order? Reach out to our Karachi team directly on WhatsApp or leave us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* WhatsApp Card */}
          <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-950">WhatsApp Customer Support</h3>
                <p className="text-xs text-emerald-700">Fastest response (Usually under 15 mins)</p>
              </div>
            </div>
            
            <p className="text-xs text-emerald-900 leading-relaxed">
              Order directly, ask sizing questions, or check dispatch tracking status with our team.
            </p>

            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappInternational}?text=${encodeURIComponent('Hello Premium Fit, I have a question regarding baggy trousers.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1faa50] text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Message {BRAND_CONFIG.phoneDisplay}</span>
            </a>
          </div>

          {/* Phone Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-700 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Phone & Helpline</h4>
                <a
                  href={`tel:${BRAND_CONFIG.phoneRaw}`}
                  className="text-sm font-semibold text-blue-800 hover:underline"
                >
                  {BRAND_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Available Monday to Saturday, 10:00 AM – 8:00 PM PKT.
            </p>
          </div>

          {/* Email Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-700 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Email Address</h4>
                <a
                  href={`mailto:${BRAND_CONFIG.email}`}
                  className="text-sm font-semibold text-blue-800 hover:underline"
                >
                  {BRAND_CONFIG.email}
                </a>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              For business partnerships, bulk orders, and media inquiries.
            </p>
          </div>

          {/* Location & Warehouse */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-700 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Fulfillment Center</h4>
                <p className="text-xs text-slate-700">Karachi, Sindh, Pakistan</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              All orders are packed and dispatched directly from our Karachi warehouse.
            </p>
          </div>

        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-1">
            Send an Online Message
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Fill in your details below and your message will immediately connect to our WhatsApp desk.
          </p>

          {submitted && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your inquiry was opened in WhatsApp. Our team will assist you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Muhammad Ali"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number</label>
              <input
                type="tel"
                placeholder="0323 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Message or Question *</label>
              <textarea
                required
                rows={4}
                placeholder="How can we assist you with our baggy trousers?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-[#0A2540] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message via WhatsApp</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
