import React from 'react';
import { Check, Bookmark, RotateCcw } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onStepClick: (step: number) => void;
  onSaveDraft?: () => void;
  onResetStep?: () => void;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  onStepClick,
  onSaveDraft,
  onResetStep,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
            Step {currentStep} of {totalSteps}
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">
            {stepTitles[currentStep - 1] || `Step ${currentStep}`}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {onSaveDraft && (
            <button
              onClick={onSaveDraft}
              className="text-xs text-slate-300 hover:text-emerald-400 bg-slate-900 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" />
              Save Progress
            </button>
          )}
          {onResetStep && (
            <button
              onClick={onResetStep}
              className="text-xs text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-700/80 p-1.5 rounded-lg transition-colors"
              title="Reset step inputs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800 relative">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Numbers Pill Indicator (Horizontal Scroll on Mobile) */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {stepTitles.map((title, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <button
              key={stepNum}
              onClick={() => onStepClick(stepNum)}
              title={title}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
                isCurrent
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/40'
                  : isCompleted
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                {isCompleted ? <Check className="w-3 h-3 text-emerald-400" /> : stepNum}
              </span>
              <span className="hidden lg:inline max-w-[100px] truncate">{title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
