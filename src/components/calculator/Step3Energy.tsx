import React from 'react';
import type { EnergyInput, ApplianceItem } from '../../types/carbon';
import { Zap, Sun, Plus, Trash2, Cpu, Thermometer } from 'lucide-react';

interface Step3EnergyProps {
  data: EnergyInput;
  onChange: (updated: EnergyInput) => void;
}

export const Step3Energy: React.FC<Step3EnergyProps> = ({ data, onChange }) => {
  const defaultAppliances = [
    { name: 'Air Conditioner (AC)', watts: 1500, category: 'cooling' },
    { name: 'Refrigerator', watts: 200, category: 'kitchen' },
    { name: 'Washing Machine', watts: 500, category: 'laundry' },
    { name: 'Television (LED/OLED)', watts: 100, category: 'electronics' },
    { name: 'Laptop / PC', watts: 150, category: 'electronics' },
    { name: 'Water Heater / Geyser', watts: 2000, category: 'heating' },
    { name: 'Ceiling Fans & Lights', watts: 120, category: 'other' },
  ];

  const handleAddAppliance = (preset: { name: string; watts: number; category: string }) => {
    const app: ApplianceItem = {
      id: 'app-' + Date.now() + Math.random().toString(36).substr(2, 3),
      name: preset.name,
      category: preset.category as any,
      quantity: 1,
      powerWatts: preset.watts,
      hoursPerDay: 4,
      daysPerMonth: 30,
    };
    onChange({
      ...data,
      appliances: [...(data.appliances || []), app],
    });
  };

  const updateAppliance = (id: string, field: keyof ApplianceItem, value: any) => {
    onChange({
      ...data,
      appliances: (data.appliances || []).map((app) => (app.id === id ? { ...app, [field]: value } : app)),
    });
  };

  const removeAppliance = (id: string) => {
    onChange({
      ...data,
      appliances: (data.appliances || []).filter((app) => app.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      {/* SECTION A: Electricity Bill or kWh */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">1. Electricity Consumption</h3>
          </div>
          <button
            type="button"
            onClick={() => onChange({ ...data, knowsExactKwh: !data.knowsExactKwh })}
            className="text-xs text-emerald-400 hover:underline"
          >
            {data.knowsExactKwh ? 'Switch to Bill Amount' : 'I know exact kWh/month'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.knowsExactKwh ? (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Monthly Electricity Consumption (kWh)
              </label>
              <input
                type="number"
                min="0"
                value={data.monthlyKwh || ''}
                onChange={(e) => onChange({ ...data, monthlyKwh: parseFloat(e.target.value) || 0 })}
                placeholder="e.g. 250"
                className="glass-input w-full"
              />
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Average Electricity Bill per Month ($ or ₹)
              </label>
              <input
                type="number"
                min="0"
                value={data.monthlyBillAmount || ''}
                onChange={(e) => onChange({ ...data, monthlyBillAmount: parseFloat(e.target.value) || 0 })}
                placeholder="e.g. 2000"
                className="glass-input w-full"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                We estimate ~kWh automatically from local tariff averages
              </span>
            </div>
          )}

          {/* Renewable & Solar Sliders */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Solar / Renewable Percentage
                </span>
                <span className="text-emerald-400 font-bold">{data.renewablePercentage || 0}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={data.renewablePercentage || 0}
                onChange={(e) => onChange({ ...data, renewablePercentage: parseInt(e.target.value) || 0 })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B: Heating & Cooling Controls */}
      <div className="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-rose-400" />
          <h3 className="text-sm font-bold text-white">2. Air Conditioning & Heating</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">AC Usage (Hours/Day)</label>
            <input
              type="number"
              min="0"
              max="24"
              value={data.acUsageHoursPerDay || 0}
              onChange={(e) => onChange({ ...data, acUsageHoursPerDay: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">AC Type</label>
            <select
              value={data.acType || 'inverter'}
              onChange={(e) => onChange({ ...data, acType: e.target.value as any })}
              className="glass-input w-full text-xs"
            >
              <option value="inverter" className="bg-slate-900">Inverter AC (Energy Efficient)</option>
              <option value="non_inverter" className="bg-slate-900">Standard Non-Inverter AC</option>
              <option value="central" className="bg-slate-900">Central AC System</option>
              <option value="none" className="bg-slate-900">No Air Conditioner</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Home Heating Type</label>
            <select
              value={data.heatingType || 'none'}
              onChange={(e) => onChange({ ...data, heatingType: e.target.value as any })}
              className="glass-input w-full text-xs"
            >
              <option value="none" className="bg-slate-900">No Space Heating</option>
              <option value="electric" className="bg-slate-900">Electric Heater / Heat Pump</option>
              <option value="gas" className="bg-slate-900">Gas Furnace</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION C: Appliance Power Calculator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">3. Appliance Power Calculator (Optional)</h3>
              <p className="text-xs text-slate-400">Energy = Power (Watts) × Hours Used</p>
            </div>
          </div>
        </div>

        {/* Quick Add Presets */}
        <div className="flex flex-wrap gap-2">
          {defaultAppliances.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handleAddAppliance(preset)}
              className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" /> Add {preset.name}
            </button>
          ))}
        </div>

        {/* Active Appliance List */}
        {data.appliances && data.appliances.length > 0 && (
          <div className="space-y-2">
            {data.appliances.map((app) => (
              <div key={app.id} className="glass-card p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border border-slate-800">
                <div className="font-semibold text-white min-w-[150px]">{app.name}</div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400">Watts:</span>
                    <input
                      type="number"
                      value={app.powerWatts}
                      onChange={(e) => updateAppliance(app.id, 'powerWatts', parseFloat(e.target.value) || 0)}
                      className="glass-input py-1 px-2 text-xs w-20 text-center"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400">Hrs/Day:</span>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={app.hoursPerDay}
                      onChange={(e) => updateAppliance(app.id, 'hoursPerDay', parseFloat(e.target.value) || 0)}
                      className="glass-input py-1 px-2 text-xs w-16 text-center"
                    />
                  </div>
                  <div className="text-emerald-400 font-mono font-bold">
                    {Math.round(((app.quantity * app.powerWatts * app.hoursPerDay * 30) / 1000))} kWh/mo
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAppliance(app.id)}
                    className="text-rose-400 hover:text-rose-300 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
