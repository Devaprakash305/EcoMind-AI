import React from 'react';
import { COUNTRY_BENCHMARKS } from '../../data/emissionFactors';
import { Globe, Target, CheckCircle, AlertTriangle } from 'lucide-react';

interface BenchmarkCompareProps {
  userTonnes: number;
}

export const BenchmarkCompare: React.FC<BenchmarkCompareProps> = ({ userTonnes }) => {
  const maxBenchmark = Math.max(16, userTonnes + 2);

  return (
    <div className="glass-panel p-6 space-y-6 border border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Global & National Benchmark Comparison</h3>
        </div>
        <div className="text-xs text-slate-400">Target: 2.0 t CO₂e (Paris Climate Agreement)</div>
      </div>

      <div className="space-y-4">
        <div className="bg-emerald-950/40 border border-emerald-500/40 p-3.5 rounded-xl space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-white">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Target className="w-4 h-4" /> Your Calculated Footprint
            </span>
            <span className="text-emerald-300 text-sm font-extrabold">{userTonnes} t CO₂e/yr</span>
          </div>
          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (userTonnes / maxBenchmark) * 100)}%` }}
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {COUNTRY_BENCHMARKS.map((bm) => {
            const pct = Math.min(100, (bm.averageTonnesPerYear / maxBenchmark) * 100);
            const isTarget = bm.code === 'TARGET';

            return (
              <div key={bm.code} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">{bm.country}</span>
                    {isTarget && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                        2030 Climate Goal
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-slate-400">
                    {bm.averageTonnesPerYear} t CO₂e/yr
                  </span>
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 flex">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isTarget ? 'bg-emerald-400' : 'bg-slate-700'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-xs">
          {userTonnes <= 2.0 ? (
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Outstanding! Your footprint meets the 2030 Paris Climate Target benchmark of &le; 2.0 t CO₂e/year.</span>
            </div>
          ) : userTonnes <= 4.7 ? (
            <div className="bg-blue-950/30 border border-blue-500/30 p-3 rounded-xl text-blue-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-blue-400" />
              <span>Great job! Your footprint is lower than the Global Average (4.7 t CO₂e/year).</span>
            </div>
          ) : (
            <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Your footprint exceeds the global average (4.7 t). Check our What-If Simulator to explore potential reductions.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
