import React from 'react';
import type { CalculationResult } from '../../types/carbon';
import { formatNumber } from '../../utils/formatters';
import { Cloud, Calendar, Clock, Award } from 'lucide-react';

interface SummaryCardsProps {
  result: CalculationResult;
  onOpenScoreDetails: () => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ result, onOpenScoreDetails }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Card 1: Main Total Footprint */}
      <div className="lg:col-span-2 glass-panel p-6 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Cloud className="w-24 h-24 text-emerald-400" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
            <Cloud className="w-4 h-4" /> Estimated Annual Carbon Footprint
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
            {result.totalTonnesCO2e} <span className="text-xl text-emerald-400 font-medium">t CO₂e/yr</span>
          </div>
          <div className="text-xs text-slate-400 mt-1 font-mono">
            = {formatNumber(result.totalKgCO2e)} kg CO₂e per year
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-slate-300">
          <span>Calculation Mode:</span>
          <span className="font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            {result.mode} Estimate
          </span>
        </div>
      </div>

      {/* Card 2: Monthly Footprint */}
      <div className="glass-card p-5 border border-slate-800 flex flex-col justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-400" /> Monthly Average
          </span>
          <div className="text-2xl font-bold text-white mt-2">
            {formatNumber(result.monthlyKgCO2e)} <span className="text-xs text-slate-400 font-normal">kg</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
          Monthly breakdown
        </div>
      </div>

      {/* Card 3: Daily Average */}
      <div className="glass-card p-5 border border-slate-800 flex flex-col justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400" /> Daily Average
          </span>
          <div className="text-2xl font-bold text-white mt-2">
            {result.dailyKgCO2e} <span className="text-xs text-slate-400 font-normal">kg</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
          Per day footprint
        </div>
      </div>

      {/* Card 4: Sustainability Score */}
      <div className="glass-card p-5 border border-slate-800 flex flex-col justify-between cursor-pointer hover:border-emerald-500/40 transition-colors" onClick={onOpenScoreDetails}>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> Eco Score
            </span>
            <span className="text-[10px] text-emerald-400 hover:underline">Details</span>
          </div>
          <div className="text-2xl font-bold text-white mt-2 flex items-baseline gap-1">
            <span style={{ color: result.score.color }}>{result.score.score}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
        </div>
        <div className="text-xs font-semibold mt-3 pt-2 border-t border-slate-800" style={{ color: result.score.color }}>
          {result.score.label}
        </div>
      </div>
    </div>
  );
};
