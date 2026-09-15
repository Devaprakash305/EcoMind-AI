import React from 'react';
import { Leaf, ShieldCheck, FileText } from 'lucide-react';

interface AboutPageProps {
  onOpenDisclaimer: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenDisclaimer }) => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full">
          <Leaf className="w-3.5 h-3.5" /> EcoMind AI Project Overview
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About EcoMind AI</h1>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Empowering individuals to make measurable, sustainable choices for a healthier planet.
        </p>
      </div>

      {/* Problem vs Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-3 border border-slate-800">
          <h3 className="text-base font-bold text-rose-400 uppercase tracking-wider">The Problem</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Most individuals are unaware of how their everyday activities—from daily commutes and AC cooling to diet choices, online shopping, and water heating—collectively contribute to greenhouse gas emissions and global climate change.
          </p>
        </div>

        <div className="glass-card p-6 space-y-3 border border-emerald-500/30 bg-emerald-950/20">
          <h3 className="text-base font-bold text-emerald-400 uppercase tracking-wider">The Solution</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            EcoMind AI translates complex lifestyle activities into understandable carbon metrics (kg CO₂e/year and tonnes CO₂e/year), providing interactive simulations, automated insights, and personalized action goals to reduce personal footprint.
          </p>
        </div>
      </div>

      {/* Vision Statement Banner */}
      <div className="glass-panel p-8 text-center space-y-3 border border-emerald-500/40 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900">
        <span className="text-xs uppercase font-bold text-emerald-400 tracking-widest">Our Vision</span>
        <blockquote className="text-xl font-bold text-white italic max-w-2xl mx-auto">
          "Empowering individuals to make measurable, sustainable choices for a healthier planet."
        </blockquote>
      </div>

      {/* Technical Architecture & Privacy Guarantee */}
      <div className="glass-card p-6 space-y-4 border border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> Frontend-Only & Zero-Server Privacy Guarantee
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          EcoMind AI runs 100% on your local web browser. Your calculator entries, draft inputs, calculation history, and sustainability goals are stored locally in <code className="text-emerald-400 font-mono">localStorage</code>. No personal data, tracking cookies, or server transmission is ever required.
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-slate-800">
          <span className="text-xs text-slate-400">Scientific Emission Factors & Methodology:</span>
          <button
            onClick={onOpenDisclaimer}
            className="btn-emerald text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" /> Read Scientific Disclaimer
          </button>
        </div>
      </div>
    </div>
  );
};
