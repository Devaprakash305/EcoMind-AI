import React from 'react';
import type { PersonalInfoInput, LivingArrangement, HomeType } from '../../types/carbon';
import { User, Home, Users, MapPin, Maximize2 } from 'lucide-react';

interface Step1PersonalProps {
  data: PersonalInfoInput;
  onChange: (updated: PersonalInfoInput) => void;
}

export const Step1Personal: React.FC<Step1PersonalProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfoInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const countries = ['India', 'USA', 'United Kingdom', 'Germany', 'Canada', 'Australia', 'Japan', 'China', 'Brazil', 'Other'];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
        <User className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <strong className="text-white block font-semibold mb-0.5">Demographics & Household Context</strong>
          Your country grid intensity and household size help divide shared household energy, cooking fuel, and waste emissions accurately per person.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Country <span className="text-rose-400">*</span>
          </label>
          <select
            value={data.country || 'India'}
            onChange={(e) => handleChange('country', e.target.value)}
            className="glass-input w-full"
          >
            {countries.map((c) => (
              <option key={c} value={c} className="bg-slate-900 text-white">
                {c}
              </option>
            ))}
          </select>
          <span className="text-[11px] text-slate-400 block">Determines default electrical grid carbon intensity</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">State / Region</label>
            <input
              type="text"
              placeholder="e.g. Maharashtra"
              value={data.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
              className="glass-input w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">City</label>
            <input
              type="text"
              placeholder="e.g. Mumbai"
              value={data.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="glass-input w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            Number of People in Household <span className="text-rose-400">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="10"
              value={data.householdSize || 1}
              onChange={(e) => handleChange('householdSize', parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-sm font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 min-w-[50px] text-center">
              {data.householdSize || 1} {data.householdSize === 1 ? 'Person' : 'People'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Living Arrangement</label>
          <select
            value={data.livingArrangement || 'family'}
            onChange={(e) => handleChange('livingArrangement', e.target.value as LivingArrangement)}
            className="glass-input w-full"
          >
            <option value="alone" className="bg-slate-900">Living Alone</option>
            <option value="family" className="bg-slate-900">With Family</option>
            <option value="shared" className="bg-slate-900">Shared Accommodation / Flatmates</option>
            <option value="hostel" className="bg-slate-900">Hostel / Dormitory</option>
            <option value="other" className="bg-slate-900">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            Home Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['apartment', 'house', 'villa'] as HomeType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange('homeType', type)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                  data.homeType === type
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-emerald-400" />
              Home Size (sq ft)
            </label>
            <input
              type="number"
              min="100"
              max="10000"
              step="50"
              value={data.homeSquareFeet || 1000}
              onChange={(e) => handleChange('homeSquareFeet', parseFloat(e.target.value) || 0)}
              className="glass-input w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Number of Rooms</label>
            <input
              type="number"
              min="1"
              max="20"
              value={data.roomCount || 3}
              onChange={(e) => handleChange('roomCount', parseInt(e.target.value) || 1)}
              className="glass-input w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
