import React from 'react';
import type { ScoreDetails } from '../../types/carbon';
import { Award, HelpCircle, ShieldCheck } from 'lucide-react';

interface ScoreGaugeProps {
  score: ScoreDetails;
  onOpenDisclaimer: () => void;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, onOpenDisclaimer }) => {
  const percentage = score.score;

  return (
    <div className="glass-panel p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Sustainability Index</h3>
        </div>
        <button
          onClick={onOpenDisclaimer}
          className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
        >
          <HelpCircle className="w-3.5 h-3.5" /> Scoring Methodology
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-800 stroke-current"
              strokeWidth="3.5"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="stroke-current transition-all duration-1000 ease-out"
              strokeWidth="3.5"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
              fill="none"
              style={{ color: score.color }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-white">{score.score}</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">/ 100</span>
          </div>
        </div>

        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border" style={{ color: score.color, borderColor: score.color + '40', backgroundColor: score.color + '15' }}>
            {score.label} Rating
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md">
            {score.description}
          </p>
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Normalized against IPCC 2.0t Paris Climate Target
          </div>
        </div>
      </div>
    </div>
  );
};
