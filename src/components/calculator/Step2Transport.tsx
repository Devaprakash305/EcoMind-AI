import React from 'react';
import type { VehicleInput, DirectFuelInput, PublicTransportInput, ActiveTransportInput, VehicleType } from '../../types/carbon';
import { Car, Bus, Bike, Plus, Trash2, ShieldCheck, Fuel } from 'lucide-react';

interface Step2TransportProps {
  vehicles: VehicleInput[];
  setVehicles: (v: VehicleInput[]) => void;
  directFuel: DirectFuelInput;
  setDirectFuel: (df: DirectFuelInput) => void;
  publicTransport: PublicTransportInput;
  setPublicTransport: (pt: PublicTransportInput) => void;
  activeTransport: ActiveTransportInput;
  setActiveTransport: (at: ActiveTransportInput) => void;
}

export const Step2Transport: React.FC<Step2TransportProps> = ({
  vehicles,
  setVehicles,
  directFuel,
  setDirectFuel,
  publicTransport,
  setPublicTransport,
  activeTransport,
  setActiveTransport,
}) => {
  const addVehicle = () => {
    const newV: VehicleInput = {
      id: 'v-' + Date.now(),
      name: `Vehicle ${vehicles.length + 1}`,
      vehicleType: 'petrol_car',
      fuelType: 'petrol',
      dailyDistanceKm: 15,
      daysPerWeek: 5,
      weeksPerYear: 52,
      passengers: 1,
    };
    setVehicles([...vehicles, newV]);
  };

  const updateVehicle = (id: string, field: keyof VehicleInput, value: any) => {
    setVehicles(
      vehicles.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const removeVehicle = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* SECTION A: Personal Vehicles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">1. Personal Vehicles</h3>
          </div>
          <button
            type="button"
            onClick={addVehicle}
            className="btn-emerald text-xs py-1.5 px-3 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Vehicle
          </button>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-xl p-6 text-center text-slate-400 text-xs">
            No personal vehicles added. If you do not own a vehicle, skip to Public Transit below.
          </div>
        ) : (
          <div className="space-y-4">
            {vehicles.map((vehicle, index) => (
              <div key={vehicle.id} className="glass-card p-4 space-y-4 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Vehicle #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeVehicle(vehicle.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 p-1 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Vehicle Type</label>
                    <select
                      value={vehicle.vehicleType}
                      onChange={(e) => updateVehicle(vehicle.id, 'vehicleType', e.target.value as VehicleType)}
                      className="glass-input w-full text-xs"
                    >
                      <option value="petrol_car" className="bg-slate-900">Petrol Car</option>
                      <option value="diesel_car" className="bg-slate-900">Diesel Car</option>
                      <option value="hybrid_car" className="bg-slate-900">Hybrid Car</option>
                      <option value="electric_car" className="bg-slate-900">Electric Car (EV)</option>
                      <option value="motorcycle" className="bg-slate-900">Motorcycle</option>
                      <option value="scooter" className="bg-slate-900">Scooter</option>
                      <option value="other" className="bg-slate-900">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Daily Distance (km)</label>
                    <input
                      type="number"
                      min="0"
                      max="500"
                      value={vehicle.dailyDistanceKm}
                      onChange={(e) => updateVehicle(vehicle.id, 'dailyDistanceKm', parseFloat(e.target.value) || 0)}
                      className="glass-input w-full text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Normal Passengers</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={vehicle.passengers}
                      onChange={(e) => updateVehicle(vehicle.id, 'passengers', parseInt(e.target.value) || 1)}
                      className="glass-input w-full text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION B: Direct Monthly Fuel Consumption */}
      <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Fuel className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">Direct Monthly Fuel Input (Optional)</h3>
        </div>
        <p className="text-xs text-slate-400">If you know your exact fuel bills/liters per month, enter them here:</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-[11px] text-slate-300 block mb-1">Petrol (Liters/mo)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={directFuel.petrolLitersPerMonth || ''}
              onChange={(e) => setDirectFuel({ ...directFuel, petrolLitersPerMonth: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-300 block mb-1">Diesel (Liters/mo)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={directFuel.dieselLitersPerMonth || ''}
              onChange={(e) => setDirectFuel({ ...directFuel, dieselLitersPerMonth: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-300 block mb-1">CNG (kg/mo)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={directFuel.cngKgPerMonth || ''}
              onChange={(e) => setDirectFuel({ ...directFuel, cngKgPerMonth: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-300 block mb-1">EV Charging (kWh/mo)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={directFuel.evElectricityKwhPerMonth || ''}
              onChange={(e) => setDirectFuel({ ...directFuel, evElectricityKwhPerMonth: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
            />
          </div>
        </div>
      </div>

      {/* SECTION C: Public Transportation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bus className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">2. Public & Shared Transportation</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Bus (km/week)</label>
            <input
              type="number"
              min="0"
              value={publicTransport.busKmPerWeek || ''}
              onChange={(e) => setPublicTransport({ ...publicTransport, busKmPerWeek: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Train (km/week)</label>
            <input
              type="number"
              min="0"
              value={publicTransport.trainKmPerWeek || ''}
              onChange={(e) => setPublicTransport({ ...publicTransport, trainKmPerWeek: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Metro / Subway (km/week)</label>
            <input
              type="number"
              min="0"
              value={publicTransport.metroKmPerWeek || ''}
              onChange={(e) => setPublicTransport({ ...publicTransport, metroKmPerWeek: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Auto-Rickshaw (km/wk)</label>
            <input
              type="number"
              min="0"
              value={publicTransport.autorickshawKmPerWeek || ''}
              onChange={(e) => setPublicTransport({ ...publicTransport, autorickshawKmPerWeek: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Taxi / Cab (km/week)</label>
            <input
              type="number"
              min="0"
              value={publicTransport.taxiKmPerWeek || ''}
              onChange={(e) => setPublicTransport({ ...publicTransport, taxiKmPerWeek: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Rideshare (km/week)</label>
            <input
              type="number"
              min="0"
              value={publicTransport.rideshareKmPerWeek || ''}
              onChange={(e) => setPublicTransport({ ...publicTransport, rideshareKmPerWeek: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* SECTION D: Active Transport */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Bike className="w-5 h-5" />
            <span>3. Walking & Cycling (Zero Direct Emissions)</span>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Eco Choice
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Walking (km/week)</label>
            <input
              type="number"
              min="0"
              value={activeTransport.walkingKmPerWeek || ''}
              onChange={(e) => setActiveTransport({ ...activeTransport, walkingKmPerWeek: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Cycling (km/week)</label>
            <input
              type="number"
              min="0"
              value={activeTransport.cyclingKmPerWeek || ''}
              onChange={(e) => setActiveTransport({ ...activeTransport, cyclingKmPerWeek: parseFloat(e.target.value) || 0 })}
              className="glass-input w-full text-xs"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
