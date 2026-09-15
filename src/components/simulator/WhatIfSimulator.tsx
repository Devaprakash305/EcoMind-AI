import React, { useState } from 'react';
import type { CalculationResult } from '../../types/carbon';
import { Sliders, Sparkles, RotateCcw, TrendingDown, ShieldCheck } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

interface WhatIfSimulatorProps {
  currentResult: CalculationResult;
  onApplyScenarioAsGoal?: (savingKg: number, title: string) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ currentResult, onApplyScenarioAsGoal }) => {
  const [carReductionPct, setCarReductionPct] = useState<number>(25);
  const [renewablePct, setRenewablePct] = useState<number>(30);
  const [meatReductionPct, setMeatReductionPct] = useState<number>(30);
  const [flightReductionPct, setFlightReductionPct] = useState<number>(50);
  const [recyclingPct, setRecyclingPct] = useState<number>(50);
  const [foodWasteReductionPct, setFoodWasteReductionPct] = useState<number>(40);

  const resetSliders = () => {
    setCarReductionPct(0);
    setRenewablePct(0);
    setMeatReductionPct(0);
    setFlightReductionPct(0);
    setRecyclingPct(0);
    setFoodWasteReductionPct(0);
  };

  const transportCat = currentResult.categories.find((c) => c.id === 'transportation');
  const electricityCat = currentResult.categories.find((c) => c.id === 'electricity');
  const foodCat = currentResult.categories.find((c) => c.id === 'food');
  const flightsCat = currentResult.categories.find((c) => c.id === 'flights');
  const wasteCat = currentResult.categories.find((c) => c.id === 'waste');

  const transportSavingsKg = transportCat ? Math.round(transportCat.kgCO2e * (carReductionPct / 100)) : 0;
  const electricitySavingsKg = electricityCat ? Math.round(electricityCat.kgCO2e * (renewablePct / 100)) : 0;
  const foodSavingsKg = foodCat ? Math.round(foodCat.kgCO2e * ((meatReductionPct + foodWasteReductionPct * 0.5) / 100)) : 0;
  const flightSavingsKg = flightsCat ? Math.round(flightsCat.kgCO2e * (flightReductionPct / 100)) : 0;
  const wasteSavingsKg = wasteCat ? Math.round(wasteCat.kgCO2e * (recyclingPct / 100)) : 0;

  const totalSavedKg = Math.round(
    transportSavingsKg + electricitySavingsKg + foodSavingsKg + flightSavingsKg + wasteSavingsKg
  );
  const newTotalKg = Math.max(0, currentResult.totalKgCO2e - totalSavedKg);
  const newTotalTonnes = Number((newTotalKg / 1000).toFixed(2));
  const reductionPercentage = currentResult.totalKgCO2e > 0 ? Number(((totalSavedKg / currentResult.totalKgCO2e) * 100).toFixed(1)) : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 border border-emerald-500/30 bg-gradient-to-r from-slate-900 to-emerald-950/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              What-If Lifestyle Simulator <Sparkles className="w-4 h-4 text-emerald-400" />
            </h2>
            <p className="text-xs text-slate-400">Adjust lifestyle levers to simulate real-time carbon reduction impact</p>
          </div>
        </div>

        <button
          onClick={resetSliders}
          className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Levers
        </button>
      </div>

      {/* Main Results Delta Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 border border-slate-800 text-center">
          <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Current Footprint</span>
          <div className="text-3xl font-bold text-white">{currentResult.totalTonnesCO2e} t</div>
          <span className="text-[11px] text-slate-400 font-mono">{formatNumber(currentResult.totalKgCO2e)} kg CO₂e</span>
        </div>

        <div className="glass-card p-5 border border-emerald-500/40 bg-emerald-950/20 text-center flex flex-col justify-between">
          <span className="text-xs uppercase font-bold text-emerald-400 block mb-1">New Simulated Footprint</span>
          <div className="text-3xl font-extrabold text-emerald-300">{newTotalTonnes} t</div>
          <span className="text-[11px] text-emerald-400 font-semibold">{formatNumber(newTotalKg)} kg CO₂e</span>
        </div>

        <div className="glass-card p-5 border border-teal-500/40 bg-teal-950/20 text-center flex flex-col justify-between">
          <span className="text-xs uppercase font-bold text-teal-300 block mb-1 flex items-center justify-center gap-1">
            <TrendingDown className="w-4 h-4 text-teal-400" /> Potential Reduction
          </span>
          <div className="text-3xl font-extrabold text-teal-200">
            -{Number((totalSavedKg / 1000).toFixed(2))} t
          </div>
          <span className="text-xs font-bold text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded-full inline-block mx-auto border border-teal-500/30">
            {reductionPercentage}% Saved
          </span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="glass-panel p-6 space-y-6 border border-slate-800">
        <h3 className="text-base font-bold text-white">Adjust Lifestyle Scenarios</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lever 1: Reduce Car Trips */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white">Reduce Personal Car Driving / Carpool</span>
              <span className="text-emerald-400 font-bold">-{carReductionPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="75"
              step="5"
              value={carReductionPct}
              onChange={(e) => setCarReductionPct(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Saved: {formatNumber(transportSavingsKg)} kg CO₂e/yr</span>
              <span>2 car trips/wk = ~25%</span>
            </div>
          </div>

          {/* Lever 2: Increase Clean Electricity */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white">Switch to Solar / Renewable Electricity</span>
              <span className="text-amber-400 font-bold">+{renewablePct}% Clean</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={renewablePct}
              onChange={(e) => setRenewablePct(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Saved: {formatNumber(electricitySavingsKg)} kg CO₂e/yr</span>
              <span>Rooftop solar = up to 90%</span>
            </div>
          </div>

          {/* Lever 3: Plant-Based Diet */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white">Replace Meat with Plant-Based Meals</span>
              <span className="text-purple-400 font-bold">-{meatReductionPct}% Meat</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="10"
              value={meatReductionPct}
              onChange={(e) => setMeatReductionPct(parseInt(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Saved: {formatNumber(foodSavingsKg)} kg CO₂e/yr</span>
              <span>Meatless Mondays = ~15%</span>
            </div>
          </div>

          {/* Lever 4: Reduce Flights */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white">Reduce Air Travel / Replace with Train</span>
              <span className="text-cyan-400 font-bold">-{flightReductionPct}% Flights</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              value={flightReductionPct}
              onChange={(e) => setFlightReductionPct(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Saved: {formatNumber(flightSavingsKg)} kg CO₂e/yr</span>
              <span>Cut 1 flight/yr = ~400kg</span>
            </div>
          </div>

          {/* Lever 5: Recycle & Compost */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white">Increase Household Recycling & Composting</span>
              <span className="text-lime-400 font-bold">+{recyclingPct}% Diversion</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={recyclingPct}
              onChange={(e) => setRecyclingPct(parseInt(e.target.value))}
              className="w-full accent-lime-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Saved: {formatNumber(wasteSavingsKg)} kg CO₂e/yr</span>
              <span>Zero food waste = 60%+</span>
            </div>
          </div>

          {/* Lever 6: Reduce Food Waste */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white">Reduce Food Waste Through Meal Planning</span>
              <span className="text-rose-400 font-bold">-{foodWasteReductionPct}% Waste</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="10"
              value={foodWasteReductionPct}
              onChange={(e) => setFoodWasteReductionPct(parseInt(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>Saved: ~{Math.round(foodWasteReductionPct * 4.5)} kg CO₂e/yr</span>
              <span>Meal planning</span>
            </div>
          </div>
        </div>

        {onApplyScenarioAsGoal && totalSavedKg > 0 && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={() =>
                onApplyScenarioAsGoal(
                  totalSavedKg,
                  `Reduce carbon footprint by ${reductionPercentage}% (${totalSavedKg} kg CO₂e/yr)`
                )
              }
              className="btn-emerald text-xs py-2.5 px-6 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Save this Scenario as an Active Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
