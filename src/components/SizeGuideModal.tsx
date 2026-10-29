import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { SIZE_CHART } from '../config/brandConfig';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">
              Baggy Trouser Size Chart
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Measurements in inches. Designed for a true relaxed baggy streetwear drape.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Size Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-[11px]">
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Waist (Inches)</th>
                <th className="py-2.5 px-3">Length</th>
                <th className="py-2.5 px-3">Thigh</th>
                <th className="py-2.5 px-3">Recommended Height</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {SIZE_CHART.map((row) => (
                <tr key={row.size} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-blue-900 bg-slate-50/50">
                    {row.size}
                  </td>
                  <td className="py-3 px-3 font-medium">{row.waist}</td>
                  <td className="py-3 px-3 font-medium">{row.length}</td>
                  <td className="py-3 px-3 font-medium">{row.thigh}</td>
                  <td className="py-3 px-3 text-slate-500">{row.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Helpful fitting tips */}
        <div className="mt-5 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Waistband:</strong> Features an elastic waistband with internal adjustable drawcord that flexibly accommodates 2–3 inches of adjustment.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Baggy Cut:</strong> Trousers are intentionally tailored with generous thigh and knee volume for an authentic modern street silhouette.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Exchange Guarantee:</strong> If the size does not fit, we offer an easy 7-day size exchange across Pakistan.
            </span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0A2540] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
