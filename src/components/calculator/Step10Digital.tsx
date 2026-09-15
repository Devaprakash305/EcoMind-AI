import React from 'react';
import type { DigitalInput } from '../../types/carbon';
import { Laptop, Info } from 'lucide-react';

interface Step10DigitalProps {
  data: DigitalInput;
  onChange: (updated: DigitalInput) => void;
}

export const Step10Digital: React.FC<Step10DigitalProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof DigitalInput, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Laptop className="w-5 h-5 text-indigo-400" />
        <h3 className="text-base font-bold text-white">Digital Carbon Footprint</h3>
      </div>

      <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <span>
          Digital emissions stem from data center cloud servers, transmission networks, and standby electronic devices. This is categorized as an <strong>estimated indirect footprint</strong>.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Streaming & Media</h4>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Video Streaming (HD/4K)</span>
              <span className="font-bold text-indigo-300">{data.videoStreamingHoursPerDay || 2} hrs/day</span>
            </div>
            <input
              type="range"
              min="0"
              max="16"
              value={data.videoStreamingHoursPerDay || 2}
              onChange={(e) => handleChange('videoStreamingHoursPerDay', parseFloat(e.target.value) || 0)}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Gaming (PC / Console)</span>
              <span className="font-bold text-indigo-300">{data.gamingHoursPerDay || 1} hrs/day</span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              value={data.gamingHoursPerDay || 1}
              onChange={(e) => handleChange('gamingHoursPerDay', parseFloat(e.target.value) || 0)}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Devices & Cloud</h4>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Active Connected Devices (Count)</label>
            <input
              type="number"
              min="1"
              max="20"
              value={data.devicesCount || 3}
              onChange={(e) => handleChange('devicesCount', parseInt(e.target.value) || 1)}
              className="glass-input w-full text-xs"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Cloud Storage Used (GB)</label>
            <input
              type="number"
              min="0"
              step="50"
              value={data.cloudStorageGb || 100}
              onChange={(e) => handleChange('cloudStorageGb', parseFloat(e.target.value) || 0)}
              className="glass-input w-full text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
