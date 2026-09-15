import React from 'react';
import type { FoodInput, DietType, FoodFrequencies } from '../../types/carbon';
import { Utensils, Check } from 'lucide-react';

interface Step5FoodProps {
  data: FoodInput;
  onChange: (updated: FoodInput) => void;
}

export const Step5Food: React.FC<Step5FoodProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof FoodInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleFreqChange = (item: keyof FoodFrequencies, value: number) => {
    onChange({
      ...data,
      frequencies: {
        ...(data.frequencies || {} as any),
        [item]: value,
      },
    });
  };

  const dietTypes: { id: DietType; label: string; desc: string; color: string }[] = [
    { id: 'vegan', label: 'Vegan', desc: '100% Plant-Based Food', color: '#10B981' },
    { id: 'vegetarian', label: 'Vegetarian', desc: 'Includes Dairy, No Meat/Fish', color: '#059669' },
    { id: 'eggetarian', label: 'Eggetarian', desc: 'Dairy & Eggs, No Meat', color: '#3B82F6' },
    { id: 'pescatarian', label: 'Pescatarian', desc: 'Fish & Seafood, No Red Meat', color: '#06B6D4' },
    { id: 'low_meat', label: 'Low-Meat', desc: 'Meat < 2-3 times/week', color: '#F59E0B' },
    { id: 'moderate_meat', label: 'Moderate-Meat', desc: 'Meat 4-5 times/week', color: '#F97316' },
    { id: 'high_meat', label: 'High-Meat', desc: 'Meat daily or multiple meals', color: '#EF4444' },
  ];

  const foodItemLabels: { key: keyof FoodFrequencies; label: string; impact: string }[] = [
    { key: 'beef', label: 'Beef', impact: 'Very High Carbon' },
    { key: 'muttonLamb', label: 'Mutton / Lamb', impact: 'Very High Carbon' },
    { key: 'chicken', label: 'Chicken / Poultry', impact: 'Moderate Carbon' },
    { key: 'fish', label: 'Fish & Seafood', impact: 'Moderate Carbon' },
    { key: 'eggs', label: 'Eggs', impact: 'Low-Moderate Carbon' },
    { key: 'milk', label: 'Dairy Milk', impact: 'Moderate Carbon' },
    { key: 'cheese', label: 'Cheese / Paneer', impact: 'High Carbon' },
    { key: 'rice', label: 'Rice', impact: 'Low-Moderate Carbon' },
    { key: 'wheat', label: 'Wheat & Grains', impact: 'Low Carbon' },
    { key: 'vegetables', label: 'Fresh Vegetables', impact: 'Low Carbon' },
    { key: 'fruits', label: 'Fresh Fruits', impact: 'Low Carbon' },
    { key: 'pulses', label: 'Pulses & Beans', impact: 'Low Carbon' },
    { key: 'fastFood', label: 'Fast Food & Dining Out', impact: 'Moderate Carbon' },
  ];

  return (
    <div className="space-y-8">
      {/* SECTION A: Primary Diet Pattern */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">1. Dietary Pattern</h3>
          </div>
          <button
            type="button"
            onClick={() => handleChange('useDetailedFoodInput', !data.useDetailedFoodInput)}
            className="text-xs text-emerald-400 hover:underline"
          >
            {data.useDetailedFoodInput ? "I don't want to enter individual foods" : 'Enter individual food item breakdown'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {dietTypes.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => handleChange('dietType', d.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                data.dietType === d.id
                  ? 'bg-purple-500/10 border-purple-500 text-purple-300 shadow-lg ring-1 ring-purple-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-white flex items-center justify-between">
                {d.label}
                {data.dietType === d.id && <Check className="w-3.5 h-3.5 text-purple-400" />}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">{d.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION B: Detailed Food Item Frequency */}
      {data.useDetailedFoodInput && (
        <div className="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs uppercase tracking-wider text-purple-400 font-bold">
            Weekly Servings Breakdown
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {foodItemLabels.map((item) => {
              const currentVal = data.frequencies ? data.frequencies[item.key] || 0 : 0;
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-300">
                    <span>{item.label}</span>
                    <span className="font-bold text-purple-300">{currentVal} servings/wk</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="14"
                    value={currentVal}
                    onChange={(e) => handleFreqChange(item.key, parseInt(e.target.value) || 0)}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION C: Sourcing & Waste Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
            <span>Locally Produced Food</span>
            <span className="text-emerald-400 font-bold">{data.locallyProducedPercentage || 50}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={data.locallyProducedPercentage || 50}
            onChange={(e) => handleChange('locallyProducedPercentage', parseInt(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
            <span>Imported / Air-Freighted</span>
            <span className="text-rose-400 font-bold">{data.importedPercentage || 10}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={data.importedPercentage || 10}
            onChange={(e) => handleChange('importedPercentage', parseInt(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
            <span>Household Food Waste</span>
            <span className="text-amber-400 font-bold">{data.foodWastePercentage || 10}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="5"
            value={data.foodWastePercentage || 10}
            onChange={(e) => handleChange('foodWastePercentage', parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
