import React from 'react';
import type { ConsumerGoodsInput } from '../../types/carbon';
import { ShoppingBag, RefreshCw } from 'lucide-react';

interface Step9ShoppingProps {
  data: ConsumerGoodsInput;
  onChange: (updated: ConsumerGoodsInput) => void;
}

export const Step9Shopping: React.FC<Step9ShoppingProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ConsumerGoodsInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-pink-400" />
          <h3 className="text-base font-bold text-white">Shopping & Consumer Goods</h3>
        </div>
        <button
          type="button"
          onClick={() => handleChange('knowsDetailedShopping', !data.knowsDetailedShopping)}
          className="text-xs text-emerald-400 hover:underline"
        >
          {data.knowsDetailedShopping ? 'Use monthly spending estimate' : 'Enter product counts by category'}
        </button>
      </div>

      {data.knowsDetailedShopping ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-xs text-slate-300 block mb-1">Clothing Items Purchased / Year</label>
            <input
              type="number"
              min="0"
              value={data.clothingItemsPerYear || 12}
              onChange={(e) => handleChange('clothingItemsPerYear', parseInt(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Electronics Purchased / Year</label>
            <input
              type="number"
              min="0"
              value={data.electronicsItemsPerYear || 2}
              onChange={(e) => handleChange('electronicsItemsPerYear', parseInt(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Household / Furniture / Other / Year</label>
            <input
              type="number"
              min="0"
              value={data.householdItemsPerYear || 4}
              onChange={(e) => handleChange('householdItemsPerYear', parseInt(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold text-slate-300">
            Approximate Monthly Spend on Goods & Goods Shopping ($ or ₹)
          </label>
          <input
            type="number"
            min="0"
            step="50"
            value={data.monthlySpendAmount || 150}
            onChange={(e) => handleChange('monthlySpendAmount', parseFloat(e.target.value) || 0)}
            className="glass-input w-full"
          />
          <span className="text-[11px] text-slate-400 block">Spend-based metrics provide an estimated macro carbon proxy</span>
        </div>
      )}

      <div className="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
          <RefreshCw className="w-4 h-4" />
          <span>Circular Economy & Product Lifespan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Secondhand / Thrifted Items</span>
              <span className="text-emerald-400 font-bold">{data.secondhandPercentage || 15}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={data.secondhandPercentage || 15}
              onChange={(e) => handleChange('secondhandPercentage', parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Repaired Instead of Replaced</span>
              <span className="text-purple-400 font-bold">{data.repairedPercentage || 20}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={data.repairedPercentage || 20}
              onChange={(e) => handleChange('repairedPercentage', parseInt(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
