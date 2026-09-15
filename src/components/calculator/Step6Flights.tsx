import React from 'react';
import type { FlightInput, FlightClass } from '../../types/carbon';
import { Plane } from 'lucide-react';

interface Step6FlightsProps {
  data: FlightInput;
  onChange: (updated: FlightInput) => void;
}

export const Step6Flights: React.FC<Step6FlightsProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof FlightInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const seatingClasses: { id: FlightClass; label: string; multiplier: string }[] = [
    { id: 'economy', label: 'Economy', multiplier: '1.0x Baseline' },
    { id: 'premium_economy', label: 'Premium Economy', multiplier: '1.3x Footprint' },
    { id: 'business', label: 'Business Class', multiplier: '2.5x Footprint' },
    { id: 'first', label: 'First Class', multiplier: '3.5x Footprint' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Flights & Air Travel</h3>
        </div>
        <button
          type="button"
          onClick={() => handleChange('knowsDirectDistance', !data.knowsDirectDistance)}
          className="text-xs text-emerald-400 hover:underline"
        >
          {data.knowsDirectDistance ? 'Count flights by category' : 'I know total flight km/year'}
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Typical Flight Seat Class</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {seatingClasses.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleChange('flightClass', sc.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                data.flightClass === sc.id
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-white">{sc.label}</div>
              <div className="text-[10px] text-slate-400 mt-1">{sc.multiplier}</div>
            </button>
          ))}
        </div>
      </div>

      {data.knowsDirectDistance ? (
        <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold text-slate-300">Total Air Travel Distance (km/year)</label>
          <input
            type="number"
            min="0"
            step="500"
            value={data.directDistanceKmPerYear || ''}
            onChange={(e) => handleChange('directDistanceKmPerYear', parseFloat(e.target.value) || 0)}
            placeholder="e.g. 12000"
            className="glass-input w-full"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider">Domestic Flights / Year</h4>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">Short Domestic (&lt; 800 km / &lt; 2 hrs)</label>
              <input
                type="number"
                min="0"
                value={data.domesticShortFlightsPerYear || ''}
                onChange={(e) => handleChange('domesticShortFlightsPerYear', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="glass-input w-full text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">Medium Domestic (800 – 2,500 km)</label>
              <input
                type="number"
                min="0"
                value={data.domesticMediumFlightsPerYear || ''}
                onChange={(e) => handleChange('domesticMediumFlightsPerYear', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="glass-input w-full text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">Long Domestic (&gt; 2,500 km)</label>
              <input
                type="number"
                min="0"
                value={data.domesticLongFlightsPerYear || ''}
                onChange={(e) => handleChange('domesticLongFlightsPerYear', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="glass-input w-full text-xs"
              />
            </div>
          </div>

          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider">International Flights / Year</h4>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">Short International (&lt; 3,000 km)</label>
              <input
                type="number"
                min="0"
                value={data.intlShortFlightsPerYear || ''}
                onChange={(e) => handleChange('intlShortFlightsPerYear', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="glass-input w-full text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">Medium International (3,000 – 6,000 km)</label>
              <input
                type="number"
                min="0"
                value={data.intlMediumFlightsPerYear || ''}
                onChange={(e) => handleChange('intlMediumFlightsPerYear', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="glass-input w-full text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 block">Long-Haul International (&gt; 6,000 km)</label>
              <input
                type="number"
                min="0"
                value={data.intlLongFlightsPerYear || ''}
                onChange={(e) => handleChange('intlLongFlightsPerYear', parseInt(e.target.value) || 0)}
                placeholder="0"
                className="glass-input w-full text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
