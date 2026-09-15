import React, { useState } from 'react';
import { DEFAULT_ECO_ACTIONS } from '../../data/defaultEcoActions';
import type { EcoAction } from '../../types/carbon';
import { Leaf, Plus, Check } from 'lucide-react';

interface EcoActionsListProps {
  onAddGoal: (action: EcoAction) => void;
}

export const EcoActionsList: React.FC<EcoActionsListProps> = ({ onAddGoal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedActionIds, setAddedActionIds] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Actions' },
    { id: 'transportation', label: 'Transport' },
    { id: 'electricity', label: 'Electricity' },
    { id: 'food', label: 'Food & Diet' },
    { id: 'water', label: 'Water' },
    { id: 'waste', label: 'Waste' },
    { id: 'shopping', label: 'Shopping' },
  ];

  const filteredActions =
    selectedCategory === 'all'
      ? DEFAULT_ECO_ACTIONS
      : DEFAULT_ECO_ACTIONS.filter((a) => a.category === selectedCategory);

  const handleAdd = (action: EcoAction) => {
    onAddGoal(action);
    setAddedActionIds([...addedActionIds, action.id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" /> Sustainability Action Library
          </h3>
          <p className="text-xs text-slate-400">Practical steps to slash your annual carbon emissions</p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActions.map((action) => {
          const isAdded = addedActionIds.includes(action.id);

          return (
            <div
              key={action.id}
              className="glass-card p-5 space-y-3 border border-slate-800 hover:border-emerald-500/40 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    -{action.estimatedSavingKgPerYear} kg CO₂e/yr
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      action.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : action.difficulty === 'Moderate'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}
                  >
                    {action.difficulty}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{action.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{action.description}</p>
              </div>

              <button
                onClick={() => handleAdd(action)}
                disabled={isAdded}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isAdded
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                    : 'btn-emerald'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added to Goals
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Add as Goal
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
