import React, { useState } from 'react';
import type { CategoryResult } from '../../types/carbon';
import { formatNumber } from '../../utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieIcon, BarChart2 } from 'lucide-react';

interface CategoryBreakdownProps {
  categories: CategoryResult[];
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ categories }) => {
  const [viewMode, setViewMode] = useState<'donut' | 'bars'>('donut');

  const filteredCategories = categories.filter((c) => c.kgCO2e > 0);
  const sortedCategories = [...categories].sort((a, b) => b.kgCO2e - a.kgCO2e);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as CategoryResult;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <div className="font-bold text-white flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            {data.name}
          </div>
          <div className="text-slate-300 font-mono">
            {formatNumber(data.kgCO2e)} kg CO₂e ({data.tonnesCO2e} t)
          </div>
          <div className="text-emerald-400 font-bold">{data.percentage}% of total</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 space-y-6 border border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-emerald-400" />
            Category Emissions Breakdown
          </h3>
          <p className="text-xs text-slate-400">Contribution of each activity sector</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('donut')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              viewMode === 'donut' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" /> Donut
          </button>
          <button
            onClick={() => setViewMode('bars')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              viewMode === 'bars' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" /> Bars
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-5 h-[280px] w-full flex items-center justify-center">
          {viewMode === 'donut' ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="kgCO2e"
                >
                  {filteredCategories.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full space-y-2 overflow-y-auto max-h-[260px] pr-2">
              {sortedCategories.slice(0, 6).map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-300">
                    <span>{cat.name}</span>
                    <span className="font-bold text-white">{cat.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-3">
          {sortedCategories.map((cat) => {
            if (cat.kgCO2e === 0) return null;
            return (
              <div
                key={cat.id}
                className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <div>
                    <span className="font-semibold text-white block">{cat.name}</span>
                    <span className="text-[11px] text-slate-400">{cat.tonnesCO2e} t CO₂e/yr</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-white block">{formatNumber(cat.kgCO2e)} kg</span>
                  <span className="text-[11px] font-bold text-emerald-400">{cat.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
