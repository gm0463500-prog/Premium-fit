import React, { useState } from 'react';
import { MessageCircle, Check, Copy, ExternalLink, AlertTriangle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brandConfig';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
  rawMessage: string;
  customerName: string;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  isOpen,
  onClose,
  whatsappUrl,
  rawMessage,
  customerName,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    // Open in new tab/window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="text-center pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#25D366] flex items-center justify-center mx-auto mb-3 shadow-inner">
            <MessageCircle className="w-8 h-8 fill-current" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            One Final Step to Place Your Order!
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Thank you, <span className="font-semibold text-slate-800">{customerName}</span>. Your order details are generated below.
          </p>
        </div>

        {/* Critical Instructions Alert Box */}
        <div className="my-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-950">
              Important: You MUST press "Send" in WhatsApp
            </p>
            <p className="text-amber-800 leading-relaxed text-[11px]">
              Clicking below will open WhatsApp with your pre-filled order. <strong>Opening WhatsApp alone does NOT send the order</strong>. Please press the green send button inside WhatsApp so our team receives your order and confirms dispatch.
            </p>
          </div>
        </div>

        {/* Message Preview Box */}
        <div className="my-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 px-1">
            <span className="font-medium">Order Message Preview:</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-blue-700 hover:text-blue-900 cursor-pointer text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy text</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-48 overflow-y-auto font-mono text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed select-all">
            {rawMessage}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 space-y-2.5">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#25D366] hover:bg-[#1faa50] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Open WhatsApp to Send Order</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={handleCopy}
              className="flex-1 py-2 text-xs border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {copied ? '✓ Message Copied' : 'Copy Message Text'}
            </button>
            <button
              onClick={onClose}
              className="py-2 px-4 text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              Keep Editing
            </button>
          </div>
        </div>

        <p className="text-[11px] text-center text-slate-400 mt-4">
          Business WhatsApp: +{BRAND_CONFIG.whatsappInternational} ({BRAND_CONFIG.phoneDisplay})
        </p>
      </div>
    </div>
  );
};
