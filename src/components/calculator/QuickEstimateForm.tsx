import React from 'react';
import type { QuickEstimateInput, VehicleFuelType, DietType } from '../../types/carbon';
import { Zap, Car, Bus, Utensils, Plane, Trash2, ShoppingBag, Users } from 'lucide-react';

interface QuickEstimateFormProps {
  data: QuickEstimateInput;
  onChange: (updated: QuickEstimateInput) => void;
  onSubmit: () => void;
}

export const QuickEstimateForm: React.FC<QuickEstimateFormProps> = ({ data, onChange, onSubmit }) => {
  const handleChange = (field: keyof QuickEstimateInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
        <span className="font-semibold">⚡ Quick Estimate Mode: 8 Essential Questions</span>
        <span className="text-[11px] text-slate-400">Generates instant footprint in ~2 minutes</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Q1: Household Size */}
        <div className="glass-card p-4 space-y-2 border border-slate-800">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Users className="w-4 h-4 text-emerald-400" />
            1. People in Household
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="10"
              value={data.householdSize || 1}
              onChange={(e) => handleChange('householdSize', parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 min-w-[36px] text-center">
              {data.householdSize || 1}
            </span>
          </div>
        </div>

        {/* Q2: Electricity */}
        <div className="glass-card p-4 space-y-2 border border-slate-800">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              2. Monthly Electricity
            </label>
            <button
              type="button"
              onClick={() => handleChange('isKwh', !data.isKwh)}
              className="text-[10px] text-emerald-400 hover:underline"
            >
              {data.isKwh ? 'Use Bill $' : 'Use kWh'}
            </button>
          </div>
          <input
            type="number"
            min="0"
            value={data.electricityBillOrKwh || ''}
            onChange={(e) => handleChange('electricityBillOrKwh', parseFloat(e.target.value) || 0)}
            placeholder={data.isKwh ? 'e.g. 250 kWh' : 'e.g. 1500 bill amount'}
            className="glass-input w-full text-xs"
          />
        </div>

        {/* Q3: Personal Car/Vehicle */}
        <div className="glass-card p-4 space-y-2 border border-slate-800">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Car className="w-4 h-4 text-emerald-400" />
            3. Weekly Driving (km/wk)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min="0"
              value={data.carKmPerWeek || ''}
              onChange={(e) => handleChange('carKmPerWeek', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 100 km"
              className="glass-input w-full text-xs"
            />
            <select
              value={data.fuelType || 'petrol_car'}
              onChange={(e) => handleChange('fuelType', e.target.value as VehicleFuelType)}
              className="glass-input w-full text-xs"
            >
              <option value="petrol_car" className="bg-slate-900">Petrol Car</option>
              <option value="diesel_car" className="bg-slate-900">Diesel Car</option>
              <option value="hybrid_car" className="bg-slate-900">Hybrid</option>
              <option value="electric_car" className="bg-slate-900">EV</option>
              <option value="motorcycle" className="bg-slate-900">Motorcycle</option>
            </select>
          </div>
        </div>

        {/* Q4: Public Transport */}
        <div className="glass-card p-4 space-y-2 border border-slate-800">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Bus className="w-4 h-4 text-blue-400" />
            4. Public Transport (km/wk)
          </label>
          <input
            type="number"
            min="0"
            value={data.publicTransportKmPerWeek || ''}
            onChange={(e) => handleChange('publicTransportKmPerWeek', parseFloat(e.target.value) || 0)}
            placeholder="e.g. 30 km"
            className="glass-input w-full text-xs"
          />
        </div>

        {/* Q5: Diet */}
        <div className="glass-card p-4 space-y-2 border border-slate-800">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-purple-400" />
            5. Typical Diet Pattern
          </label>
          <select
            value={data.dietType || 'moderate_meat'}
            onChange={(e) => handleChange('dietType', e.target.value as DietType)}
            className="glass-input w-full text-xs"
          >
            <option value="vegan" className="bg-slate-900">Vegan (Plant-based)</option>
            <option value="vegetarian" className="bg-slate-900">Vegetarian</option>
            <option value="eggetarian" className="bg-slate-900">Eggetarian</option>
            <option value="pescatarian" className="bg-slate-900">Pescatarian (Fish)</option>
            <option value="low_meat" className="bg-slate-900">Low-Meat (&lt; 2x/wk)</option>
            <option value="moderate_meat" className="bg-slate-900">Moderate-Meat</option>
            <option value="high_meat" className="bg-slate-900">High-Meat (Daily)</option>
          </select>
        </div>

        {/* Q6: Flights */}
        <div className="glass-card p-4 space-y-2 border border-slate-800">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Plane className="w-4 h-4 text-cyan-400" />
            6. Flights per Year
          </label>
          <input
            type="number"
            min="0"
            value={data.flightsPerYear || ''}
            onChange={(e) => handleChange('flightsPerYear', parseInt(e.target.value) || 0)}
            placeholder="e.g. 2 flights"
            className="glass-input w-full text-xs"
          />
        </div>

        {/* Q7: Waste */}
        <div className="glass-card p-4 space-y-2 border border-slate-800">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <Trash2 className="w-4 h-4 text-lime-400" />
            7. Household Waste Habit
          </label>
          <select
            value={data.wasteHabit || 'moderate'}
            onChange={(e) => handleChange('wasteHabit', e.target.value as any)}
            className="glass-input w-full text-xs"
          >
            <option value="low" className="bg-slate-900">Low Waste (Recycle & Compost active)</option>
            <option value="moderate" className="bg-slate-900">Moderate Household Waste</option>
            <option value="high" className="bg-slate-900">High Trash Generation</option>
          </select>
        </div>

        {/* Q8: Shopping */}
        <div className="glass-card p-4 space-y-2 border border-slate-800">
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-pink-400" />
            8. Goods Shopping Habit
          </label>
          <select
            value={data.shoppingHabit || 'moderate'}
            onChange={(e) => handleChange('shoppingHabit', e.target.value as any)}
            className="glass-input w-full text-xs"
          >
            <option value="minimal" className="bg-slate-900">Minimalist / Secondhand Preferred</option>
            <option value="moderate" className="bg-slate-900">Moderate Consumer Goods Purchases</option>
            <option value="frequent" className="bg-slate-900">Frequent Shopping & Upgrades</option>
          </select>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button
          onClick={onSubmit}
          className="btn-emerald text-sm py-3 px-8 shadow-xl shadow-emerald-500/25 flex items-center gap-2"
        >
          Calculate Quick Footprint
        </button>
      </div>
    </div>
  );
};
