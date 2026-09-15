import React from 'react';
import type { HistoryRecord } from '../../types/carbon';
import { formatDate, formatNumber } from '../../utils/formatters';
import { X, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';

interface CompareModalProps {
  recordA: HistoryRecord;
  recordB: HistoryRecord;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ recordA, recordB, onClose }) => {
  const isBNewer = new Date(recordB.createdAt).getTime() >= new Date(recordA.createdAt).getTime();
  const prevRecord = isBNewer ? recordA : recordB;
  const currRecord = isBNewer ? recordB : recordA;

  const totalDeltaKg = currRecord.totalKgCO2e - prevRecord.totalKgCO2e;
  const pctChange = prevRecord.totalKgCO2e > 0 ? Number(((totalDeltaKg / prevRecord.totalKgCO2e) * 100).toFixed(1)) : 0;
  const isReduced = totalDeltaKg < 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel max-w-3xl w-full p-6 sm:p-8 space-y-6 relative my-8 border border-slate-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-white">Side-by-Side Footprint Comparison</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
              Previous ({formatDate(prevRecord.createdAt)})
            </span>
            <div className="text-2xl font-bold text-white">{prevRecord.totalTonnesCO2e} t</div>
            <span className="text-xs text-slate-400 font-mono">{formatNumber(prevRecord.totalKgCO2e)} kg</span>
          </div>

          <div className="flex flex-col items-center justify-center border-y sm:border-y-0 sm:border-x border-slate-800 py-2 sm:py-0">
            <span className="text-[11px] uppercase font-bold text-slate-400 mb-1">Overall Change</span>
            <div className={`text-xl font-extrabold flex items-center gap-1 ${isReduced ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isReduced ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              {Math.abs(pctChange)}%
            </div>
            <span className="text-xs font-semibold text-slate-300">
              {isReduced ? `Saved ${formatNumber(Math.abs(totalDeltaKg))} kg` : `Increased by ${formatNumber(totalDeltaKg)} kg`}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
              Current ({formatDate(currRecord.createdAt)})
            </span>
            <div className="text-2xl font-bold text-emerald-400">{currRecord.totalTonnesCO2e} t</div>
            <span className="text-xs text-slate-400 font-mono">{formatNumber(currRecord.totalKgCO2e)} kg</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center justify-between">
            <span>What Caused the Change? Category Analysis</span>
          </h4>

          <div className="space-y-2 overflow-y-auto max-h-[300px] pr-1">
            {currRecord.categories.map((catB) => {
              const catA = prevRecord.categories.find((c) => c.id === catB.id);
              const prevKg = catA ? catA.kgCO2e : 0;
              const currKg = catB.kgCO2e;
              const deltaKg = currKg - prevKg;

              if (prevKg === 0 && currKg === 0) return null;

              return (
                <div key={catB.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: catB.color }} />
                    <span className="font-semibold text-white">{catB.name}</span>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <span className="text-slate-400 font-mono">{formatNumber(prevKg)} kg</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                    <span className="font-bold text-white font-mono">{formatNumber(currKg)} kg</span>

                    <span
                      className={`min-w-[80px] font-bold px-2 py-0.5 rounded text-center text-[11px] ${
                        deltaKg < 0
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : deltaKg > 0
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {deltaKg < 0 ? `- ${formatNumber(Math.abs(deltaKg))} kg` : deltaKg > 0 ? `+ ${formatNumber(deltaKg)} kg` : 'No change'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button onClick={onClose} className="btn-secondary text-xs px-5">
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
