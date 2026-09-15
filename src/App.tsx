import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DisclaimerModal } from './components/layout/DisclaimerModal';
import { LandingPage } from './pages/LandingPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { DashboardPage } from './pages/DashboardPage';
import { GoalsPage } from './pages/GoalsPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { WhatIfSimulator } from './components/simulator/WhatIfSimulator';
import type { CalculationResult, HistoryRecord, SustainabilityGoal, EcoAction } from './types/carbon';
import { storageService } from './services/storageService';
import { calculateCarbonFootprint } from './utils/carbonCalculator';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);

  const [latestResult, setLatestResult] = useState<CalculationResult | null>(() => {
    return storageService.getLatestResult();
  });

  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    return storageService.getHistory();
  });

  const [goals, setGoals] = useState<SustainabilityGoal[]>(() => {
    return storageService.getGoals();
  });

  const handleCalculationComplete = (result: CalculationResult) => {
    setLatestResult(result);
    setHistory(storageService.getHistory());
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistoryRecord = (id: string) => {
    const updated = storageService.deleteHistoryRecord(id);
    setHistory(updated);
    if (latestResult && !updated.length) {
      setLatestResult(null);
    }
  };

  const handleClearHistory = () => {
    storageService.clearHistory();
    setHistory([]);
    setLatestResult(null);
  };

  const handleToggleGoal = (id: string) => {
    const updated = storageService.toggleGoalCompletion(id);
    setGoals(updated);
  };

  const handleDeleteGoal = (id: string) => {
    const updated = storageService.deleteGoal(id);
    setGoals(updated);
  };

  const handleAddGoalFromAction = (action: EcoAction) => {
    storageService.saveGoal({
      title: action.title,
      category: action.category,
      targetReductionKg: action.estimatedSavingKgPerYear,
      currentProgressKg: 0,
      targetDate: '2026-12-31',
      isCompleted: false,
      actionId: action.id,
    });
    setGoals(storageService.getGoals());
  };

  const handleAddCustomGoal = (goal: Omit<SustainabilityGoal, 'id' | 'createdAt'>) => {
    storageService.saveGoal(goal);
    setGoals(storageService.getGoals());
  };

  const handleResetAllData = () => {
    setLatestResult(null);
    setHistory([]);
    setGoals([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetAll={handleResetAllData}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'home' && (
          <LandingPage
            onStartCalculator={() => setActiveTab('calculator')}
            onExploreFeatures={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorPage onCalculationComplete={handleCalculationComplete} />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            latestResult={latestResult}
            history={history}
            onNavigateTab={setActiveTab}
            onOpenDisclaimer={() => setShowDisclaimer(true)}
          />
        )}

        {activeTab === 'insights' && (
          <DashboardPage
            latestResult={latestResult}
            history={history}
            onNavigateTab={setActiveTab}
            onOpenDisclaimer={() => setShowDisclaimer(true)}
          />
        )}

        {activeTab === 'simulator' && latestResult && (
          <WhatIfSimulator
            currentResult={latestResult}
            onApplyScenarioAsGoal={(savingKg, title) => {
              handleAddCustomGoal({
                title,
                category: 'lifestyle',
                targetReductionKg: savingKg,
                currentProgressKg: 0,
                targetDate: '2026-12-31',
                isCompleted: false,
              });
              setActiveTab('goals');
            }}
          />
        )}

        {activeTab === 'simulator' && !latestResult && (
          <DashboardPage
            latestResult={null}
            history={history}
            onNavigateTab={setActiveTab}
            onOpenDisclaimer={() => setShowDisclaimer(true)}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsPage
            goals={goals}
            onToggleGoal={handleToggleGoal}
            onDeleteGoal={handleDeleteGoal}
            onAddGoalFromAction={handleAddGoalFromAction}
            onAddCustomGoal={handleAddCustomGoal}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            history={history}
            onDeleteRecord={handleDeleteHistoryRecord}
            onClearHistory={handleClearHistory}
            onViewRecord={(record) => {
              const reconstructedResult = calculateCarbonFootprint(record.inputs);
              setLatestResult(reconstructedResult);
              setActiveTab('dashboard');
            }}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage onOpenDisclaimer={() => setShowDisclaimer(true)} />
        )}
      </main>

      <Footer
        setActiveTab={setActiveTab}
        onOpenDisclaimer={() => setShowDisclaimer(true)}
      />

      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </div>
  );
}

export default App;
