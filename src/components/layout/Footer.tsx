import React from 'react';
import { Leaf, ShieldCheck, HelpCircle, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenDisclaimer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenDisclaimer }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">EcoMind AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Measure. Understand. Reduce. Intelligent carbon footprint management and personal sustainability platform.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Privacy</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-emerald-400 transition-colors">
                  Carbon Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-400 transition-colors">
                  Results Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('insights')} className="hover:text-emerald-400 transition-colors">
                  Smart Insights
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Sustainability Features */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-3">Features</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab('simulator')} className="hover:text-emerald-400 transition-colors">
                  What-If Simulator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('goals')} className="hover:text-emerald-400 transition-colors">
                  Goals & Eco Actions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-emerald-400 transition-colors">
                  History & Comparison
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition-colors">
                  About Methodology
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Disclaimer & Methodology */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-3">Methodology</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Calculations utilize international GHG Protocol, DEFRA, and IPCC emission factors tailored for personal activities.
            </p>
            <button
              onClick={onOpenDisclaimer}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              View Scientific Disclaimer
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} EcoMind AI. College Project & Product Demonstration.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            Built for a greener future with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
          <div>
            Designed & Developed by 
        </div>
      </div>
    </footer>
  );
};
