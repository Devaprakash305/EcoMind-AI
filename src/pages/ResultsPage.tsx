import React from 'react';
import type { CalculationResult } from '../types/carbon';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { CategoryBreakdown } from '../components/dashboard/CategoryBreakdown';
import { ScoreGauge } from '../components/dashboard/ScoreGauge';
import { SmartInsights } from '../components/dashboard/SmartInsights';
import { BenchmarkCompare } from '../components/dashboard/BenchmarkCompare';
import { exportResultAsJson, printSummaryReport } from '../utils/pdfExport';
import { Download, Printer, RotateCcw, Sliders, Target, ShieldAlert } from 'lucide-react';

interface ResultsPageProps {
  result: CalculationResult;
  onRecalculate: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenDisclaimer: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  result,
  onRecalculate,
  onNavigateTab,
  onOpenDisclaimer,
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Banner & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 border border-emerald-500/30 bg-gradient-to-r from-slate-900 to-emerald-950/20">
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
            Calculation Completed
          </span>
          <h2 className="text-2xl font-extrabold text-white">Your Carbon Footprint Dashboard</h2>
          <p className="text-xs text-slate-400">Detailed breakdown and personalized recommendations</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => printSummaryReport(result)}
            className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" /> Print / PDF Report
          </button>

          <button
            onClick={() => exportResultAsJson(result)}
            className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
            title="Export raw JSON"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" /> Export JSON
          </button>

          <button
            onClick={onRecalculate}
            className="btn-emerald text-xs py-2 px-4 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Recalculate
          </button>
        </div>
      </div>

      {/* Main Metric Cards */}
      <SummaryCards result={result} onOpenScoreDetails={onOpenDisclaimer} />

      {/* Grid Row: Category Breakdown & Score Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <CategoryBreakdown categories={result.categories} />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <ScoreGauge score={result.score} onOpenDisclaimer={onOpenDisclaimer} />

          <div className="glass-panel p-5 space-y-3 border border-slate-800">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">Next Actions</h4>

            <button
              onClick={() => onNavigateTab('simulator')}
              className="w-full btn-secondary text-xs py-2.5 px-3 flex items-center justify-between group"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" /> What-If Simulator
              </span>
              <span className="text-[10px] text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                Simulate &rarr;
              </span>
            </button>

            <button
              onClick={() => onNavigateTab('goals')}
              className="w-full btn-secondary text-xs py-2.5 px-3 flex items-center justify-between group"
            >
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4 text-teal-400" /> Set Goals & Eco Actions
              </span>
              <span className="text-[10px] text-teal-400 group-hover:translate-x-0.5 transition-transform">
                Explore &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Smart Insights */}
      <SmartInsights
        insights={result.insights}
        onStartGoal={() => onNavigateTab('goals')}
      />

      {/* Benchmark Comparisons */}
      <BenchmarkCompare userTonnes={result.totalTonnesCO2e} />

      {/* Disclaimer Banner */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-start gap-3 text-xs text-slate-400">
        <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong>Disclaimer:</strong> EcoMind AI provides estimates for educational and awareness purposes. Carbon emissions vary depending on geography, local energy sources, vehicle efficiency, and product lifecycles. Results should not be treated as an official carbon audit.
        </div>
      </div>
    </div>
  );
};
