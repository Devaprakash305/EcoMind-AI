import React from 'react';
import type { WaterInput } from '../../types/carbon';
import { Droplet } from 'lucide-react';

interface Step7WaterProps {
  data: WaterInput;
  onChange: (updated: WaterInput) => void;
}

export const Step7Water: React.FC<Step7WaterProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof WaterInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-sky-400" />
          <h3 className="text-base font-bold text-white">Water Usage & Heating Energy</h3>
        </div>
        <button
          type="button"
          onClick={() => handleChange('knowsDirectLiters', !data.knowsDirectLiters)}
          className="text-xs text-emerald-400 hover:underline"
        >
          {data.knowsDirectLiters ? 'Use shower & appliance habits' : 'I know daily liters consumed'}
        </button>
      </div>

      {data.knowsDirectLiters ? (
        <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold text-slate-300">Average Water Consumption (Liters/day)</label>
          <input
            type="number"
            min="0"
            step="10"
            value={data.directDailyLiters || 150}
            onChange={(e) => handleChange('directDailyLiters', parseFloat(e.target.value) || 0)}
            className="glass-input w-full"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs uppercase font-bold text-sky-400 tracking-wider">Shower Habits</h4>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">Shower Head Type</label>
              <select
                value={data.showerType || 'standard'}
                onChange={(e) => handleChange('showerType', e.target.value as any)}
                className="glass-input w-full text-xs"
              >
                <option value="standard" className="bg-slate-900">Standard Shower Head (10-12 L/min)</option>
                <option value="low_flow" className="bg-slate-900">Water-Saving Low-Flow Head (6 L/min)</option>
                <option value="bucket" className="bg-slate-900">Bucket Bath (Traditional Minimal)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Showers / Week</label>
                <input
                  type="number"
                  min="0"
                  max="21"
                  value={data.showersPerWeek || 7}
                  onChange={(e) => handleChange('showersPerWeek', parseInt(e.target.value) || 0)}
                  className="glass-input w-full text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 block mb-1">Duration (Mins)</label>
                <input
                  type="number"
                  min="1"
                  max="45"
                  value={data.showerDurationMins || 10}
                  onChange={(e) => handleChange('showerDurationMins', parseInt(e.target.value) || 1)}
                  className="glass-input w-full text-xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs uppercase font-bold text-sky-400 tracking-wider">Laundry & Dishes</h4>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">Washing Machine Loads / Week</label>
              <input
                type="number"
                min="0"
                value={data.washingMachineLoadsPerWeek || 3}
                onChange={(e) => handleChange('washingMachineLoadsPerWeek', parseInt(e.target.value) || 0)}
                className="glass-input w-full text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">Dishwasher Loads / Week</label>
              <input
                type="number"
                min="0"
                value={data.dishwasherLoadsPerWeek || 0}
                onChange={(e) => handleChange('dishwasherLoadsPerWeek', parseInt(e.target.value) || 0)}
                className="glass-input w-full text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
