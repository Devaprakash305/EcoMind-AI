import React from 'react';
import type { SustainabilityGoal, EcoAction } from '../types/carbon';
import { GoalsTracker } from '../components/goals/GoalsTracker';
import { EcoActionsList } from '../components/goals/EcoActionsList';

interface GoalsPageProps {
  goals: SustainabilityGoal[];
  onToggleGoal: (id: string) => void;
  onDeleteGoal: (id: string) => void;
  onAddGoalFromAction: (action: EcoAction) => void;
  onAddCustomGoal: (goal: Omit<SustainabilityGoal, 'id' | 'createdAt'>) => void;
}

export const GoalsPage: React.FC<GoalsPageProps> = ({
  goals,
  onToggleGoal,
  onDeleteGoal,
  onAddGoalFromAction,
  onAddCustomGoal,
}) => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-12">
      <GoalsTracker
        goals={goals}
        onToggleGoal={onToggleGoal}
        onDeleteGoal={onDeleteGoal}
        onAddCustomGoal={onAddCustomGoal}
      />

      <div className="pt-6 border-t border-slate-800">
        <EcoActionsList onAddGoal={onAddGoalFromAction} />
      </div>
    </div>
  );
};
