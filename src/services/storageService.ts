import type { FullCalculatorInput, HistoryRecord, SustainabilityGoal, CalculationResult } from '../types/carbon';

const STORAGE_KEYS = {
  HISTORY: 'ecomind_history',
  GOALS: 'ecomind_goals',
  DRAFT: 'ecomind_draft_input',
  LATEST_RESULT: 'ecomind_latest_result',
  USER_PREFS: 'ecomind_user_preferences',
};

export const storageService = {
  // History Management
  getHistory(): HistoryRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveHistoryRecord(result: CalculationResult, inputs: FullCalculatorInput): HistoryRecord {
    const history = this.getHistory();
    const topCategory = [...result.categories].sort((a, b) => b.kgCO2e - a.kgCO2e)[0];

    const record: HistoryRecord = {
      id: 'rec-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
      mode: result.mode,
      totalTonnesCO2e: result.totalTonnesCO2e,
      totalKgCO2e: result.totalKgCO2e,
      score: result.score.score,
      scoreLabel: result.score.label,
      topCategoryName: topCategory ? topCategory.name : 'None',
      topCategoryTonnes: topCategory ? topCategory.tonnesCO2e : 0,
      categories: result.categories,
      inputs: inputs,
    };

    const updated = [record, ...history];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.LATEST_RESULT, JSON.stringify(result));
    return record;
  },

  deleteHistoryRecord(id: string): HistoryRecord[] {
    const history = this.getHistory().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    return history;
  },

  clearHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  },

  // Latest Result
  getLatestResult(): CalculationResult | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LATEST_RESULT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // Goals Management
  getGoals(): SustainabilityGoal[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GOALS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveGoal(goal: Omit<SustainabilityGoal, 'id' | 'createdAt'>): SustainabilityGoal {
    const goals = this.getGoals();
    const newGoal: SustainabilityGoal = {
      ...goal,
      id: 'goal-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
    };
    const updated = [newGoal, ...goals];
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updated));
    return newGoal;
  },

  toggleGoalCompletion(id: string): SustainabilityGoal[] {
    const goals = this.getGoals().map((g) => {
      if (g.id === id) {
        const nextState = !g.isCompleted;
        return {
          ...g,
          isCompleted: nextState,
          currentProgressKg: nextState ? g.targetReductionKg : g.currentProgressKg,
        };
      }
      return g;
    });
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    return goals;
  },

  deleteGoal(id: string): SustainabilityGoal[] {
    const goals = this.getGoals().filter((g) => g.id !== id);
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    return goals;
  },

  // Draft Calculator Input
  getDraftInput(): FullCalculatorInput | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DRAFT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveDraftInput(input: FullCalculatorInput): void {
    localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(input));
  },

  clearDraftInput(): void {
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
  },

  // Complete Reset Data
  resetAllData(): void {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};
