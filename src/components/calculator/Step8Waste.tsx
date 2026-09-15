import React from 'react';
import type { WasteInput } from '../../types/carbon';
import { Trash2, Recycle } from 'lucide-react';

interface Step8WasteProps {
  data: WasteInput;
  onChange: (updated: WasteInput) => void;
}

export const Step8Waste: React.FC<Step8WasteProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof WasteInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-lime-400" />
          <h3 className="text-base font-bold text-white">Waste Generation & Recycling</h3>
        </div>
        <button
          type="button"
          onClick={() => handleChange('knowsDetailedWaste', !data.knowsDetailedWaste)}
          className="text-xs text-emerald-400 hover:underline"
        >
          {data.knowsDetailedWaste ? 'Simple total waste input' : 'Enter waste by category'}
        </button>
      </div>

      {data.knowsDetailedWaste ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-xs text-slate-300 block mb-1">Food Scraps (kg/wk)</label>
            <input
              type="number"
              min="0"
              value={data.foodWasteKgPerWeek || 2}
              onChange={(e) => handleChange('foodWasteKgPerWeek', parseFloat(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">Plastic Waste (kg/wk)</label>
            <input
              type="number"
              min="0"
              value={data.plasticWasteKgPerWeek || 1}
              onChange={(e) => handleChange('plasticWasteKgPerWeek', parseFloat(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">Paper & Cardboard (kg/wk)</label>
            <input
              type="number"
              min="0"
              value={data.paperWasteKgPerWeek || 1}
              onChange={(e) => handleChange('paperWasteKgPerWeek', parseFloat(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">Glass (kg/wk)</label>
            <input
              type="number"
              min="0"
              value={data.glassWasteKgPerWeek || 0.5}
              onChange={(e) => handleChange('glassWasteKgPerWeek', parseFloat(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">Metal / Cans (kg/wk)</label>
            <input
              type="number"
              min="0"
              value={data.metalWasteKgPerWeek || 0.5}
              onChange={(e) => handleChange('metalWasteKgPerWeek', parseFloat(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold text-slate-300">Total General Household Waste (kg/week)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={data.totalWasteKgPerWeek || 5}
            onChange={(e) => handleChange('totalWasteKgPerWeek', parseFloat(e.target.value) || 0)}
            className="glass-input w-full"
          />
          <span className="text-[11px] text-slate-400 block">Average household produces 4–8 kg waste/week</span>
        </div>
      )}

      <div className="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-lime-400 font-bold text-sm">
          <Recycle className="w-4 h-4" />
          <span>Waste Diversion & Recovery</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Recycled Percentage</span>
              <span className="text-emerald-400 font-bold">{data.recycledPercentage || 20}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={data.recycledPercentage || 20}
              onChange={(e) => handleChange('recycledPercentage', parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Composted Percentage</span>
              <span className="text-lime-400 font-bold">{data.compostedPercentage || 10}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={data.compostedPercentage || 10}
              onChange={(e) => handleChange('compostedPercentage', parseInt(e.target.value))}
              className="w-full accent-lime-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
