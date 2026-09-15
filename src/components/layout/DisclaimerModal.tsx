import React from 'react';
import { X, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 space-y-6 relative my-8 border border-slate-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Calculation Methodology & Disclaimer</h3>
            <p className="text-xs text-slate-400">EcoMind AI Scoring & Emission Estimations</p>
          </div>
        </div>

        {/* Section 1: Important Disclaimer */}
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 flex gap-3 text-xs text-amber-200">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <strong className="block font-semibold mb-1 text-amber-300">Educational & Awareness Purposes</strong>
            EcoMind AI provides estimated carbon footprint values for educational and lifestyle awareness. Actual GHG emissions depend on specific regional electricity grid mixes, vehicle maintenance, localized agricultural supply chains, and precise product lifecycles. Results should not be treated as an official carbon audit or scientific certification.
          </div>
        </div>

        {/* Section 2: How Sustainability Score is Calculated */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            How is the Sustainability Score (0–100) Calculated?
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            The score measures your annual carbon footprint relative to global climate targets and planetary boundaries:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-emerald-400 font-semibold">80 – 100: Excellent</span>
              <span className="text-slate-400">≤ 2.0 t CO₂e/yr (Paris Target)</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-blue-400 font-semibold">60 – 79: Good</span>
              <span className="text-slate-400">2.1 – 5.0 t CO₂e/yr</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-amber-400 font-semibold">40 – 59: Moderate</span>
              <span className="text-slate-400">5.1 – 8.0 t CO₂e/yr (Global Avg)</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-rose-400 font-semibold">0 – 39: High Impact</span>
              <span className="text-slate-400">&gt; 8.0 t CO₂e/yr</span>
            </div>
          </div>
        </div>

        {/* Section 3: Emission Factors Source */}
        <div className="space-y-2 text-xs text-slate-300">
          <h4 className="text-sm font-bold text-white">Emission Factor Data Sources</h4>
          <ul className="space-y-1.5 list-none pl-0">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong>GHG Protocol Corporate & Individual Accounting Standard</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong>UK Department for Environment, Food & Rural Affairs (DEFRA 2023)</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong>Intergovernmental Panel on Climate Change (IPCC Sixth Assessment)</strong></span>
            </li>
          </ul>
        </div>

        <div className="pt-2 flex justify-end">
          <button onClick={onClose} className="btn-emerald text-xs px-6">
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
