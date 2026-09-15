import React, { useState } from 'react';
import type { SustainabilityGoal, CategoryId } from '../../types/carbon';
import { formatDate, formatNumber } from '../../utils/formatters';
import { Target, CheckCircle2, Trash2, Plus, Calendar, Award } from 'lucide-react';

interface GoalsTrackerProps {
  goals: SustainabilityGoal[];
  onToggleGoal: (id: string) => void;
  onDeleteGoal: (id: string) => void;
  onAddCustomGoal: (goal: Omit<SustainabilityGoal, 'id' | 'createdAt'>) => void;
}

export const GoalsTracker: React.FC<GoalsTrackerProps> = ({
  goals,
  onToggleGoal,
  onDeleteGoal,
  onAddCustomGoal,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryId>('transportation');
  const [targetSavingKg, setTargetSavingKg] = useState(300);
  const [targetDate, setTargetDate] = useState('2026-12-31');

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddCustomGoal({
      title,
      category,
      targetReductionKg: targetSavingKg,
      currentProgressKg: 0,
      targetDate,
      isCompleted: false,
    });
    setTitle('');
    setShowAddModal(false);
  };

  const totalSavedKg = goals
    .filter((g) => g.isCompleted)
    .reduce((acc, g) => acc + g.targetReductionKg, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 border border-emerald-500/30 bg-gradient-to-r from-slate-900 to-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Sustainability Goals Tracker
            </h2>
            <p className="text-xs text-slate-400">Set targets and measure your ongoing carbon reduction commitments</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-emerald text-xs py-2 px-4 flex items-center gap-1.5 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Create Custom Goal
        </button>
      </div>

      {/* Overview Stat Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 border border-slate-800 text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Active Goals</span>
          <div className="text-2xl font-bold text-white">{goals.filter((g) => !g.isCompleted).length}</div>
        </div>

        <div className="glass-card p-4 border border-emerald-500/30 bg-emerald-950/20 text-center">
          <span className="text-[11px] uppercase font-bold text-emerald-400 block mb-1 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed Goals
          </span>
          <div className="text-2xl font-extrabold text-emerald-300">
            {goals.filter((g) => g.isCompleted).length}
          </div>
        </div>

        <div className="glass-card p-4 border border-teal-500/30 bg-teal-950/20 text-center">
          <span className="text-[11px] uppercase font-bold text-teal-300 block mb-1 flex items-center justify-center gap-1">
            <Award className="w-3.5 h-3.5" /> Total Carbon Savings Achieved
          </span>
          <div className="text-2xl font-extrabold text-teal-200">{formatNumber(totalSavedKg)} kg CO₂e</div>
        </div>
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="glass-panel p-12 text-center space-y-3 border border-dashed border-slate-800">
          <Target className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Sustainability Goals Active</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Choose an action from the Sustainability Action Library below or click "Create Custom Goal" to start tracking your reduction progress.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => {
            const pct = goal.isCompleted ? 100 : Math.round((goal.currentProgressKg / goal.targetReductionKg) * 100);

            return (
              <div
                key={goal.id}
                className={`glass-card p-4 transition-all border ${
                  goal.isCompleted ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleGoal(goal.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        goal.isCompleted
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'bg-slate-900 border-slate-700 text-transparent hover:border-emerald-400'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <div>
                      <h4 className={`text-sm font-bold ${goal.isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                        {goal.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                        <span className="capitalize text-emerald-400 font-semibold">{goal.category}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" /> Target: {formatDate(goal.targetDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">
                        Target: -{goal.targetReductionKg} kg CO₂e
                      </div>
                      <div className="w-32 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 mt-1">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteGoal(goal.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete Goal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Custom Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleCreateCustom} className="glass-panel max-w-md w-full p-6 space-y-4 border border-slate-700">
            <h3 className="text-lg font-bold text-white">Set Custom Sustainability Goal</h3>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Goal Description / Action</label>
              <input
                type="text"
                required
                placeholder="e.g. Switch 3 weekly commutes to cycling"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="glass-input w-full text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryId)}
                  className="glass-input w-full text-xs"
                >
                  <option value="transportation" className="bg-slate-900">Transport</option>
                  <option value="electricity" className="bg-slate-900">Electricity</option>
                  <option value="food" className="bg-slate-900">Food & Diet</option>
                  <option value="water" className="bg-slate-900">Water</option>
                  <option value="waste" className="bg-slate-900">Waste</option>
                  <option value="shopping" className="bg-slate-900">Shopping</option>
                  <option value="flights" className="bg-slate-900">Flights</option>
                  <option value="digital" className="bg-slate-900">Digital</option>
                  <option value="lifestyle" className="bg-slate-900">Lifestyle</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">Target Saving (kg)</label>
                <input
                  type="number"
                  min="10"
                  step="50"
                  value={targetSavingKg}
                  onChange={(e) => setTargetSavingKg(parseInt(e.target.value) || 0)}
                  className="glass-input w-full text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Target Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="glass-input w-full text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary text-xs">
                Cancel
              </button>
              <button type="submit" className="btn-emerald text-xs px-5">
                Save Goal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
