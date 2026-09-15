import React from 'react';
import { Zap, SlidersHorizontal, Check } from 'lucide-react';
import type { CalculatorMode } from '../../types/carbon';

interface ModeSelectorProps {
  mode: CalculatorMode;
  setMode: (mode: CalculatorMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 gap-2 shadow-xl">
      <button
        onClick={() => setMode('quick')}
        className={`flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
          mode === 'quick'
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        }`}
      >
        <Zap className={`w-4 h-4 ${mode === 'quick' ? 'fill-slate-950' : 'text-emerald-400'}`} />
        <div className="text-left">
          <div className="font-bold flex items-center gap-1.5">
            Quick Estimate Mode
            {mode === 'quick' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <div className="text-[11px] opacity-80 font-normal">8 Fast Questions (~2 mins)</div>
        </div>
      </button>

      <button
        onClick={() => setMode('detailed')}
        className={`flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
          mode === 'detailed'
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        }`}
      >
        <SlidersHorizontal className={`w-4 h-4 ${mode === 'detailed' ? 'fill-slate-950' : 'text-emerald-400'}`} />
        <div className="text-left">
          <div className="font-bold flex items-center gap-1.5">
            Detailed Estimate Mode
            {mode === 'detailed' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <div className="text-[11px] opacity-80 font-normal">11 Step Deep Audit (~5 mins)</div>
        </div>
      </button>
    </div>
  );
};
