import React from 'react';
import type { CookingInput, CookingFuelType } from '../../types/carbon';
import { Flame, ShieldCheck } from 'lucide-react';

interface Step4FuelProps {
  data: CookingInput;
  onChange: (updated: CookingInput) => void;
}

export const Step4Fuel: React.FC<Step4FuelProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof CookingInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const fuels: { id: CookingFuelType; label: string; desc: string }[] = [
    { id: 'lpg', label: 'LPG Cylinders', desc: 'Liquefied Petroleum Gas' },
    { id: 'png', label: 'Piped PNG', desc: 'Piped Natural Gas (m³)' },
    { id: 'electricity', label: 'Electric / Induction', desc: 'Induction cooktop or electric stove' },
    { id: 'biogas', label: 'Biogas', desc: 'Renewable organic digester gas' },
    { id: 'firewood', label: 'Firewood', desc: 'Traditional biomass fuel' },
    { id: 'charcoal', label: 'Charcoal', desc: 'Carbonized wood fuel' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-rose-400" />
        <h3 className="text-base font-bold text-white">Cooking & Household Fuel</h3>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Primary Cooking Energy Source</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {fuels.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleChange('primaryFuel', f.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                data.primaryFuel === f.id
                  ? 'bg-rose-500/10 border-rose-500/50 text-rose-300 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-white">{f.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{f.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        {data.primaryFuel === 'lpg' && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">LPG Cylinders Consumed per Month</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                step="0.5"
                value={data.lpgCylindersPerMonth || 1}
                onChange={(e) => handleChange('lpgCylindersPerMonth', parseFloat(e.target.value) || 0)}
                className="glass-input w-full"
              />
              <span className="text-xs text-slate-400 whitespace-nowrap">Standard 14.2 kg</span>
            </div>
          </div>
        )}

        {data.primaryFuel === 'png' && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">PNG Natural Gas (m³/month)</label>
            <input
              type="number"
              min="0"
              value={data.pngUnitsPerMonth || 15}
              onChange={(e) => handleChange('pngUnitsPerMonth', parseFloat(e.target.value) || 0)}
              className="glass-input w-full"
            />
          </div>
        )}

        {data.primaryFuel === 'firewood' && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Firewood Consumed (kg/month)</label>
            <input
              type="number"
              min="0"
              value={data.firewoodKgPerMonth || 20}
              onChange={(e) => handleChange('firewoodKgPerMonth', parseFloat(e.target.value) || 0)}
              className="glass-input w-full"
            />
          </div>
        )}

        {data.primaryFuel === 'charcoal' && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Charcoal Consumed (kg/month)</label>
            <input
              type="number"
              min="0"
              value={data.charcoalKgPerMonth || 10}
              onChange={(e) => handleChange('charcoalKgPerMonth', parseFloat(e.target.value) || 0)}
              className="glass-input w-full"
            />
          </div>
        )}

        {data.primaryFuel === 'electricity' && (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Cooking Electricity (kWh/month)</label>
            <input
              type="number"
              min="0"
              value={data.electricityKwhPerMonth || 40}
              onChange={(e) => handleChange('electricityKwhPerMonth', parseFloat(e.target.value) || 0)}
              className="glass-input w-full"
            />
          </div>
        )}

        {data.primaryFuel === 'biogas' && (
          <div className="col-span-2 text-xs text-emerald-400 bg-emerald-950/30 p-3 rounded-lg border border-emerald-500/30 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            Biogas creates closed-loop zero net carbon emissions for household cooking!
          </div>
        )}
      </div>
    </div>
  );
};
