import React, { useState } from 'react';
import type { HistoryRecord } from '../../types/carbon';
import { formatDate } from '../../utils/formatters';
import { History, Trash2, Eye, GitCompare, Calendar, Award } from 'lucide-react';
import { CompareModal } from './CompareModal';

interface HistoryListProps {
  history: HistoryRecord[];
  onDeleteRecord: (id: string) => void;
  onClearHistory: () => void;
  onViewRecord: (record: HistoryRecord) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onDeleteRecord,
  onClearHistory,
  onViewRecord,
}) => {
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [compareModalRecords, setCompareModalRecords] = useState<{ recordA: HistoryRecord; recordB: HistoryRecord } | null>(null);

  const toggleSelectCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((i) => i !== id));
    } else {
      if (selectedForCompare.length >= 2) {
        setSelectedForCompare([selectedForCompare[1], id]);
      } else {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const handleRunCompare = () => {
    if (selectedForCompare.length === 2) {
      const recordA = history.find((h) => h.id === selectedForCompare[0]);
      const recordB = history.find((h) => h.id === selectedForCompare[1]);
      if (recordA && recordB) {
        setCompareModalRecords({ recordA, recordB });
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Calculation History</h2>
            <p className="text-xs text-slate-400">Track changes in your estimated footprint over time</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedForCompare.length === 2 && (
            <button
              onClick={handleRunCompare}
              className="btn-emerald text-xs py-2 px-4 flex items-center gap-1.5 shadow-lg"
            >
              <GitCompare className="w-3.5 h-3.5" /> Compare Selected (2)
            </button>
          )}

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 p-2 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Clear entire history"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div className="glass-panel p-12 text-center space-y-3 border border-dashed border-slate-800">
          <History className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Calculation History Saved</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Complete a calculation run in the Carbon Calculator to save your historical metrics in localStorage.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((record) => {
            const isSelected = selectedForCompare.includes(record.id);

            return (
              <div
                key={record.id}
                className={`glass-card p-4 transition-all border ${
                  isSelected ? 'border-emerald-500 bg-emerald-950/20' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectCompare(record.id)}
                      className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                      title="Select for comparison"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        {formatDate(record.createdAt)}
                        <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {record.mode} mode
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Top source: <span className="text-slate-200">{record.topCategoryName}</span> ({record.topCategoryTonnes} t)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{record.totalTonnesCO2e} t CO₂e</div>
                      <div className="text-[11px] font-semibold flex items-center justify-end gap-1" style={{ color: '#10B981' }}>
                        <Award className="w-3 h-3" /> Score {record.score}/100
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewRecord(record)}
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="View result details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteRecord(record.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compare Modal Overlay */}
      {compareModalRecords && (
        <CompareModal
          recordA={compareModalRecords.recordA}
          recordB={compareModalRecords.recordB}
          onClose={() => setCompareModalRecords(null)}
        />
      )}
    </div>
  );
};
