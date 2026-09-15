import React, { useState } from 'react';
import type { FullCalculatorInput, CalculatorMode, CalculationResult } from '../types/carbon';
import { ModeSelector } from '../components/calculator/ModeSelector';
import { StepProgress } from '../components/calculator/StepProgress';
import { QuickEstimateForm } from '../components/calculator/QuickEstimateForm';
import { Step1Personal } from '../components/calculator/Step1Personal';
import { Step2Transport } from '../components/calculator/Step2Transport';
import { Step3Energy } from '../components/calculator/Step3Energy';
import { Step4Fuel } from '../components/calculator/Step4Fuel';
import { Step5Food } from '../components/calculator/Step5Food';
import { Step6Flights } from '../components/calculator/Step6Flights';
import { Step7Water } from '../components/calculator/Step7Water';
import { Step8Waste } from '../components/calculator/Step8Waste';
import { Step9Shopping } from '../components/calculator/Step9Shopping';
import { Step10Digital } from '../components/calculator/Step10Digital';
import { Step11Lifestyle } from '../components/calculator/Step11Lifestyle';
import { calculateCarbonFootprint } from '../utils/carbonCalculator';
import { storageService } from '../services/storageService';
import { ArrowLeft, ArrowRight, CheckCircle2, Bookmark } from 'lucide-react';

interface CalculatorPageProps {
  onCalculationComplete: (result: CalculationResult) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onCalculationComplete }) => {
  const [mode, setMode] = useState<CalculatorMode>('detailed');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const initialInput: FullCalculatorInput = {
    mode: 'detailed',
    personal: {
      country: 'India',
      state: '',
      city: '',
      householdSize: 1,
      livingArrangement: 'family',
      homeType: 'apartment',
      homeSquareFeet: 1000,
      roomCount: 3,
    },
    vehicles: [
      {
        id: 'v-default',
        name: 'Car',
        vehicleType: 'petrol_car',
        fuelType: 'petrol',
        dailyDistanceKm: 15,
        daysPerWeek: 5,
        weeksPerYear: 52,
        passengers: 1,
      },
    ],
    directFuel: { petrolLitersPerMonth: 0, dieselLitersPerMonth: 0, cngKgPerMonth: 0, evElectricityKwhPerMonth: 0 },
    publicTransport: { busKmPerWeek: 15, trainKmPerWeek: 0, metroKmPerWeek: 20, autorickshawKmPerWeek: 10, taxiKmPerWeek: 0, rideshareKmPerWeek: 0 },
    activeTransport: { walkingKmPerWeek: 10, cyclingKmPerWeek: 5 },
    energy: { monthlyBillAmount: 1800, knowsExactKwh: false, renewablePercentage: 0, solarPanelPercentage: 0, appliances: [], acUsageHoursPerDay: 4, acType: 'inverter', heatingType: 'none' },
    cooking: { primaryFuel: 'lpg', lpgCylindersPerMonth: 1, pngUnitsPerMonth: 0, firewoodKgPerMonth: 0, charcoalKgPerMonth: 0, electricityKwhPerMonth: 0 },
    food: { dietType: 'vegetarian', useDetailedFoodInput: false, frequencies: { beef: 0, muttonLamb: 0, chicken: 2, fish: 1, eggs: 3, milk: 7, cheese: 2, curdYogurt: 7, rice: 7, wheat: 7, vegetables: 14, fruits: 7, pulses: 7, processed: 2, fastFood: 2 }, locallyProducedPercentage: 50, importedPercentage: 10, organicPercentage: 10, foodWastePercentage: 10 },
    flights: { domesticShortFlightsPerYear: 1, domesticMediumFlightsPerYear: 1, domesticLongFlightsPerYear: 0, intlShortFlightsPerYear: 0, intlMediumFlightsPerYear: 0, intlLongFlightsPerYear: 0, flightClass: 'economy', knowsDirectDistance: false, directDistanceKmPerYear: 0 },
    water: { showersPerWeek: 7, showerDurationMins: 8, showerType: 'standard', bathsPerWeek: 0, washingMachineLoadsPerWeek: 3, dishwasherLoadsPerWeek: 0, knowsDirectLiters: false },
    waste: { totalWasteKgPerWeek: 5, knowsDetailedWaste: false, foodWasteKgPerWeek: 2, paperWasteKgPerWeek: 1, plasticWasteKgPerWeek: 1, glassWasteKgPerWeek: 0.5, metalWasteKgPerWeek: 0.5, recycledPercentage: 20, compostedPercentage: 10, landfillPercentage: 70 },
    shopping: { knowsDetailedShopping: false, monthlySpendAmount: 150, clothingItemsPerYear: 10, electronicsItemsPerYear: 2, householdItemsPerYear: 3, newPurchasesPercentage: 70, secondhandPercentage: 20, repairedPercentage: 10 },
    digital: { videoStreamingHoursPerDay: 2, musicStreamingHoursPerDay: 1, gamingHoursPerDay: 1, videoConferencingHoursPerWeek: 5, cloudStorageGb: 100, devicesCount: 3, dailyInternetGb: 3 },
    lifestyle: { hotelStaysPerYear: 2, outdoorActivitiesCount: 4, homeDeliveriesPerMonth: 4, onlineShoppingOrdersPerMonth: 3, customOtherEmissionsKgPerYear: 0 },
    quickEstimate: { householdSize: 1, electricityBillOrKwh: 1800, isKwh: false, carKmPerWeek: 75, fuelType: 'petrol', publicTransportKmPerWeek: 30, dietType: 'vegetarian', flightsPerYear: 2, wasteHabit: 'moderate', shoppingHabit: 'moderate' },
  };

  const [inputData, setInputData] = useState<FullCalculatorInput>(() => {
    const draft = storageService.getDraftInput();
    return draft || initialInput;
  });

  const stepTitles = [
    'Personal Info',
    'Transportation',
    'Home Energy',
    'Cooking & Fuel',
    'Food & Diet',
    'Flights & Travel',
    'Water Usage',
    'Waste Habits',
    'Shopping & Goods',
    'Digital Footprint',
    'Lifestyle & Other',
  ];

  const handleSaveDraft = () => {
    storageService.saveDraftInput(inputData);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  const handleSubmitCalculation = () => {
    const calcInput: FullCalculatorInput = { ...inputData, mode };
    const result = calculateCarbonFootprint(calcInput);
    storageService.saveHistoryRecord(result, calcInput);
    onCalculationComplete(result);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 px-4 py-3 rounded-xl font-bold shadow-2xl flex items-center gap-2 animate-in fade-in duration-200">
          <Bookmark className="w-4 h-4 fill-slate-950" /> Draft progress saved to browser!
        </div>
      )}

      {/* Mode Switcher */}
      <ModeSelector mode={mode} setMode={setMode} />

      {mode === 'quick' ? (
        <div className="glass-panel p-6 sm:p-8 border border-slate-800">
          <QuickEstimateForm
            data={inputData.quickEstimate || (initialInput.quickEstimate as any)}
            onChange={(updated) => setInputData({ ...inputData, quickEstimate: updated })}
            onSubmit={handleSubmitCalculation}
          />
        </div>
      ) : (
        <div className="glass-panel p-6 sm:p-8 border border-slate-800 space-y-8">
          <StepProgress
            currentStep={currentStep}
            totalSteps={11}
            stepTitles={stepTitles}
            onStepClick={(step) => setCurrentStep(step)}
            onSaveDraft={handleSaveDraft}
          />

          {/* Active Step Form View */}
          <div className="min-h-[380px]">
            {currentStep === 1 && (
              <Step1Personal
                data={inputData.personal}
                onChange={(updated) => setInputData({ ...inputData, personal: updated })}
              />
            )}
            {currentStep === 2 && (
              <Step2Transport
                vehicles={inputData.vehicles}
                setVehicles={(v) => setInputData({ ...inputData, vehicles: v })}
                directFuel={inputData.directFuel}
                setDirectFuel={(df) => setInputData({ ...inputData, directFuel: df })}
                publicTransport={inputData.publicTransport}
                setPublicTransport={(pt) => setInputData({ ...inputData, publicTransport: pt })}
                activeTransport={inputData.activeTransport}
                setActiveTransport={(at) => setInputData({ ...inputData, activeTransport: at })}
              />
            )}
            {currentStep === 3 && (
              <Step3Energy
                data={inputData.energy}
                onChange={(updated) => setInputData({ ...inputData, energy: updated })}
              />
            )}
            {currentStep === 4 && (
              <Step4Fuel
                data={inputData.cooking}
                onChange={(updated) => setInputData({ ...inputData, cooking: updated })}
              />
            )}
            {currentStep === 5 && (
              <Step5Food
                data={inputData.food}
                onChange={(updated) => setInputData({ ...inputData, food: updated })}
              />
            )}
            {currentStep === 6 && (
              <Step6Flights
                data={inputData.flights}
                onChange={(updated) => setInputData({ ...inputData, flights: updated })}
              />
            )}
            {currentStep === 7 && (
              <Step7Water
                data={inputData.water}
                onChange={(updated) => setInputData({ ...inputData, water: updated })}
              />
            )}
            {currentStep === 8 && (
              <Step8Waste
                data={inputData.waste}
                onChange={(updated) => setInputData({ ...inputData, waste: updated })}
              />
            )}
            {currentStep === 9 && (
              <Step9Shopping
                data={inputData.shopping}
                onChange={(updated) => setInputData({ ...inputData, shopping: updated })}
              />
            )}
            {currentStep === 10 && (
              <Step10Digital
                data={inputData.digital}
                onChange={(updated) => setInputData({ ...inputData, digital: updated })}
              />
            )}
            {currentStep === 11 && (
              <Step11Lifestyle
                data={inputData.lifestyle}
                onChange={(updated) => setInputData({ ...inputData, lifestyle: updated })}
              />
            )}
          </div>

          {/* Bottom Navigation Control Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {currentStep < 11 ? (
              <button
                onClick={() => setCurrentStep(Math.min(11, currentStep + 1))}
                className="btn-emerald text-xs py-2.5 px-6 flex items-center gap-1.5"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitCalculation}
                className="btn-emerald text-xs py-3 px-8 flex items-center gap-2 font-bold shadow-xl shadow-emerald-500/25"
              >
                <CheckCircle2 className="w-4 h-4" /> Calculate Detailed Footprint
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
