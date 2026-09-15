import React from 'react';
import type { HistoryRecord } from '../types/carbon';
import { HistoryList } from '../components/history/HistoryList';

interface HistoryPageProps {
  history: HistoryRecord[];
  onDeleteRecord: (id: string) => void;
  onClearHistory: () => void;
  onViewRecord: (record: HistoryRecord) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onDeleteRecord,
  onClearHistory,
  onViewRecord,
}) => {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <HistoryList
        history={history}
        onDeleteRecord={onDeleteRecord}
        onClearHistory={onClearHistory}
        onViewRecord={onViewRecord}
      />
    </div>
  );
};
