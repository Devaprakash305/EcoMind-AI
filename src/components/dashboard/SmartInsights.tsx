import React from 'react';
import type { SmartInsight } from '../../types/carbon';
import { Lightbulb, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface SmartInsightsProps {
  insights: SmartInsight[];
  onStartGoal?: (insight: SmartInsight) => void;
}

export const SmartInsights: React.FC<SmartInsightsProps> = ({ insights, onStartGoal }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="glass-panel p-6 space-y-6 border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">EcoMind AI Smart Insights</h3>
            <p className="text-xs text-slate-400">Automated reduction recommendations based on your activity data</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="glass-card p-5 space-y-3 border border-slate-800 hover:border-emerald-500/40 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-emerald-400" />
                  {insight.title}
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Save ~{insight.impactKg} kg CO₂e
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{insight.description}</p>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" /> High-Impact Action Tip:
              </div>
              <p className="text-slate-300 text-[11px] leading-normal">{insight.tip}</p>
            </div>

            {onStartGoal && (
              <button
                onClick={() => onStartGoal(insight)}
                className="w-full text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center justify-center gap-1 py-1.5 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors mt-2"
              >
                Set this as a Sustainability Goal <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
