import React from 'react';
import { Calculator, ArrowRight, ShieldCheck, Sliders, Target, Sparkles, Globe } from 'lucide-react';

interface LandingPageProps {
  onStartCalculator: () => void;
  onExploreFeatures: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartCalculator, onExploreFeatures }) => {
  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Measure. Understand. Reduce.</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Understand Your Impact. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Build a Greener Future.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            EcoMind AI helps you measure your carbon footprint across 11 lifestyle categories, discover what’s driving your emissions, and take practical steps toward a more sustainable lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartCalculator}
              className="btn-emerald text-sm py-3.5 px-8 shadow-xl shadow-emerald-500/25 flex items-center gap-2 text-slate-950 font-bold"
            >
              <Calculator className="w-4 h-4" /> Calculate My Footprint
            </button>
            <button
              onClick={onExploreFeatures}
              className="btn-secondary text-sm py-3.5 px-6 flex items-center gap-2"
            >
              Explore EcoMind AI <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Client-Side Privacy. No backend or sign-up required.</span>
          </div>
        </div>
      </section>

      {/* Feature Pillars Cards Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Intelligent Carbon Management</h2>
          <p className="text-xs text-slate-400">Comprehensive features engineered for real-world sustainability insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 space-y-4 border border-slate-800 hover:border-emerald-500/40">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">11 Category Multi-Step Calculator</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculate emissions from personal vehicles, home energy, cooking fuel, food & diet, water, waste, shopping, digital footprint, flights, and lifestyle.
            </p>
          </div>

          <div className="glass-card p-6 space-y-4 border border-slate-800 hover:border-emerald-500/40">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Interactive What-If Simulator</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Simulate changes in your daily routine—reduce car travel, switch to solar, or adopt plant-based days—and see your potential carbon savings in real time.
            </p>
          </div>

          <div className="glass-card p-6 space-y-4 border border-slate-800 hover:border-emerald-500/40">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Actionable Goals & History</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Track active reduction goals, store calculation snapshots locally, and compare historical runs to analyze what caused your footprint to change.
            </p>
          </div>
        </div>
      </section>

      {/* Global Benchmarks Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel p-8 border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> Global Climate Alignment
            </span>
            <h3 className="text-2xl font-bold text-white">How does your footprint compare to world targets?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The 2030 Paris Climate Target recommends a personal limit of &le; 2.0 tonnes CO₂e/year. The current global average is ~4.7 tonnes. Find out where you stand!
            </p>
          </div>

          <button
            onClick={onStartCalculator}
            className="btn-emerald text-xs py-3 px-6 shrink-0 flex items-center gap-2"
          >
            Start Your Calculation Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
