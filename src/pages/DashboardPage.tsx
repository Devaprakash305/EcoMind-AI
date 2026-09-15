import React from 'react';
import type { CalculationResult, HistoryRecord } from '../types/carbon';
import { ResultsPage } from './ResultsPage';
import { Calculator, ArrowRight } from 'lucide-react';

interface DashboardPageProps {
  latestResult: CalculationResult | null;
  history: HistoryRecord[];
  onNavigateTab: (tab: string) => void;
  onOpenDisclaimer: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  latestResult,
  onNavigateTab,
  onOpenDisclaimer,
}) => {
  if (!latestResult) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="glass-panel p-12 space-y-4 border border-dashed border-slate-800">
          <Calculator className="w-16 h-16 text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">No Calculation Results Yet</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Complete your carbon footprint assessment to view your visual dashboard, category breakdown, smart insights, and benchmark metrics.
          </p>
          <button
            onClick={() => onNavigateTab('calculator')}
            className="btn-emerald text-xs py-3 px-6 shadow-lg inline-flex items-center gap-2"
          >
            Start Calculation Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <ResultsPage
      result={latestResult}
      onRecalculate={() => onNavigateTab('calculator')}
      onNavigateTab={onNavigateTab}
      onOpenDisclaimer={onOpenDisclaimer}
    />
  );
};
