import React from 'react';
import type { LifestyleInput } from '../../types/carbon';
import { Compass, Package } from 'lucide-react';

interface Step11LifestyleProps {
  data: LifestyleInput;
  onChange: (updated: LifestyleInput) => void;
}

export const Step11Lifestyle: React.FC<Step11LifestyleProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof LifestyleInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Compass className="w-5 h-5 text-slate-400" />
        <h3 className="text-base font-bold text-white">Lifestyle & Other Activities</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider">Hospitality & Leisure</h4>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Hotel Stay Nights / Year</label>
            <input
              type="number"
              min="0"
              value={data.hotelStaysPerYear || 0}
              onChange={(e) => handleChange('hotelStaysPerYear', parseInt(e.target.value) || 0)}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Camping / Outdoor Trips / Year</label>
            <input
              type="number"
              min="0"
              value={data.outdoorActivitiesCount || 0}
              onChange={(e) => handleChange('outdoorActivitiesCount', parseInt(e.target.value) || 0)}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-emerald-400" /> Deliveries & E-Commerce
          </h4>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Food / Groceries Deliveries / Month</label>
            <input
              type="number"
              min="0"
              value={data.homeDeliveriesPerMonth || 4}
              onChange={(e) => handleChange('homeDeliveriesPerMonth', parseInt(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Online Shopping Package Deliveries / Month</label>
            <input
              type="number"
              min="0"
              value={data.onlineShoppingOrdersPerMonth || 3}
              onChange={(e) => handleChange('onlineShoppingOrdersPerMonth', parseInt(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">
          Custom / Unlisted Additional Annual Emissions (kg CO₂e)
        </label>
        <input
          type="number"
          min="0"
          value={data.customOtherEmissionsKgPerYear || ''}
          onChange={(e) => handleChange('customOtherEmissionsKgPerYear', parseFloat(e.target.value) || 0)}
          placeholder="0"
          className="glass-input w-full text-xs"
        />
        <span className="text-[11px] text-slate-400 block">
          If you have calculated specific emissions from hobby equipment or niche events, add them directly here.
        </span>
      </div>
    </div>
  );
};
