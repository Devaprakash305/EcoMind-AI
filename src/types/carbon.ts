export type CalculatorMode = 'quick' | 'detailed';

export type LivingArrangement = 'alone' | 'family' | 'shared' | 'hostel' | 'other';
export type HomeType = 'house' | 'apartment' | 'villa' | 'other';

export type VehicleFuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'cng' | 'other';
export type VehicleType = 'petrol_car' | 'diesel_car' | 'hybrid_car' | 'electric_car' | 'motorcycle' | 'scooter' | 'other';

export interface VehicleInput {
  id: string;
  name: string;
  vehicleType: VehicleType;
  fuelType: VehicleFuelType;
  dailyDistanceKm: number;
  daysPerWeek: number;
  weeksPerYear: number;
  efficiencyKmPerLiter?: number; // or kWh per 100km for EV
  ageYears?: number;
  passengers: number;
}

export interface DirectFuelInput {
  petrolLitersPerMonth: number;
  dieselLitersPerMonth: number;
  cngKgPerMonth: number;
  evElectricityKwhPerMonth: number;
}

export interface PublicTransportInput {
  busKmPerWeek: number;
  trainKmPerWeek: number;
  metroKmPerWeek: number;
  autorickshawKmPerWeek: number;
  taxiKmPerWeek: number;
  rideshareKmPerWeek: number;
}

export interface ActiveTransportInput {
  walkingKmPerWeek: number;
  cyclingKmPerWeek: number;
}

export interface ApplianceItem {
  id: string;
  name: string;
  category: 'cooling' | 'heating' | 'kitchen' | 'laundry' | 'electronics' | 'other';
  quantity: number;
  powerWatts: number;
  hoursPerDay: number;
  daysPerMonth: number;
}

export interface EnergyInput {
  monthlyBillAmount: number; // in local currency (e.g., INR or USD)
  monthlyKwh?: number;
  knowsExactKwh: boolean;
  renewablePercentage: number;
  solarPanelPercentage: number;
  appliances: ApplianceItem[];
  acUsageHoursPerDay: number;
  acType: 'inverter' | 'non_inverter' | 'central' | 'none';
  heatingType: 'electric' | 'gas' | 'none';
}

export type CookingFuelType = 'lpg' | 'png' | 'natural_gas' | 'electricity' | 'firewood' | 'charcoal' | 'kerosene' | 'biogas';

export interface CookingInput {
  primaryFuel: CookingFuelType;
  lpgCylindersPerMonth: number; // standard 14.2kg
  pngUnitsPerMonth: number; // m3
  firewoodKgPerMonth: number;
  charcoalKgPerMonth: number;
  electricityKwhPerMonth: number;
}

export type DietType = 'vegan' | 'vegetarian' | 'eggetarian' | 'pescatarian' | 'low_meat' | 'moderate_meat' | 'high_meat' | 'custom';

export interface FoodFrequencies {
  beef: number; // servings per week
  muttonLamb: number;
  chicken: number;
  fish: number;
  eggs: number;
  milk: number;
  cheese: number;
  curdYogurt: number;
  rice: number;
  wheat: number;
  vegetables: number;
  fruits: number;
  pulses: number;
  processed: number;
  fastFood: number;
}

export interface FoodInput {
  dietType: DietType;
  useDetailedFoodInput: boolean;
  frequencies: FoodFrequencies;
  locallyProducedPercentage: number;
  importedPercentage: number;
  organicPercentage: number;
  foodWastePercentage: number;
}

export type FlightClass = 'economy' | 'premium_economy' | 'business' | 'first';

export interface FlightInput {
  domesticShortFlightsPerYear: number; // < 800 km
  domesticMediumFlightsPerYear: number; // 800 - 2500 km
  domesticLongFlightsPerYear: number; // > 2500 km
  intlShortFlightsPerYear: number;
  intlMediumFlightsPerYear: number;
  intlLongFlightsPerYear: number;
  flightClass: FlightClass;
  knowsDirectDistance: boolean;
  directDistanceKmPerYear: number;
}

export interface WaterInput {
  showersPerWeek: number;
  showerDurationMins: number;
  showerType: 'standard' | 'low_flow' | 'bucket';
  bathsPerWeek: number;
  washingMachineLoadsPerWeek: number;
  dishwasherLoadsPerWeek: number;
  directDailyLiters?: number;
  knowsDirectLiters: boolean;
}

export interface WasteInput {
  totalWasteKgPerWeek: number;
  knowsDetailedWaste: boolean;
  foodWasteKgPerWeek: number;
  paperWasteKgPerWeek: number;
  plasticWasteKgPerWeek: number;
  glassWasteKgPerWeek: number;
  metalWasteKgPerWeek: number;
  recycledPercentage: number;
  compostedPercentage: number;
  landfillPercentage: number;
}

export interface ConsumerGoodsInput {
  knowsDetailedShopping: boolean;
  monthlySpendAmount: number; // currency spend estimation
  clothingItemsPerYear: number;
  electronicsItemsPerYear: number;
  householdItemsPerYear: number;
  newPurchasesPercentage: number;
  secondhandPercentage: number;
  repairedPercentage: number;
}

export interface DigitalInput {
  videoStreamingHoursPerDay: number;
  musicStreamingHoursPerDay: number;
  gamingHoursPerDay: number;
  videoConferencingHoursPerWeek: number;
  cloudStorageGb: number;
  devicesCount: number;
  dailyInternetGb: number;
}

export interface LifestyleInput {
  hotelStaysPerYear: number;
  outdoorActivitiesCount: number;
  homeDeliveriesPerMonth: number;
  onlineShoppingOrdersPerMonth: number;
  customOtherEmissionsKgPerYear: number;
}

export interface PersonalInfoInput {
  country: string;
  state: string;
  city: string;
  householdSize: number;
  livingArrangement: LivingArrangement;
  homeType: HomeType;
  homeSquareFeet: number;
  roomCount: number;
}

export interface QuickEstimateInput {
  householdSize: number;
  electricityBillOrKwh: number;
  isKwh: boolean;
  carKmPerWeek: number;
  fuelType: VehicleFuelType;
  publicTransportKmPerWeek: number;
  dietType: DietType;
  flightsPerYear: number;
  wasteHabit: 'low' | 'moderate' | 'high';
  shoppingHabit: 'minimal' | 'moderate' | 'frequent';
}

export interface FullCalculatorInput {
  mode: CalculatorMode;
  personal: PersonalInfoInput;
  vehicles: VehicleInput[];
  directFuel: DirectFuelInput;
  publicTransport: PublicTransportInput;
  activeTransport: ActiveTransportInput;
  energy: EnergyInput;
  cooking: CookingInput;
  food: FoodInput;
  flights: FlightInput;
  water: WaterInput;
  waste: WasteInput;
  shopping: ConsumerGoodsInput;
  digital: DigitalInput;
  lifestyle: LifestyleInput;
  quickEstimate?: QuickEstimateInput;
}

export type CategoryId =
  | 'transportation'
  | 'electricity'
  | 'cooking'
  | 'food'
  | 'flights'
  | 'water'
  | 'waste'
  | 'shopping'
  | 'digital'
  | 'lifestyle'
  | 'public_transport';

export interface CategoryResult {
  id: CategoryId;
  name: string;
  kgCO2e: number;
  tonnesCO2e: number;
  percentage: number;
  color: string;
  iconName: string;
}

export interface ScoreDetails {
  score: number; // 0 to 100
  label: 'Excellent' | 'Good' | 'Moderate' | 'High Impact' | 'Very High Impact';
  color: string;
  description: string;
}

export interface SmartInsight {
  id: string;
  categoryId: CategoryId;
  title: string;
  description: string;
  impactKg: number;
  impactPercentage: number;
  tip: string;
  priority: 'high' | 'medium' | 'low';
}

export interface CalculationResult {
  totalKgCO2e: number;
  totalTonnesCO2e: number;
  monthlyKgCO2e: number;
  dailyKgCO2e: number;
  perPersonKgCO2e: number;
  perPersonTonnesCO2e: number;
  categories: CategoryResult[];
  score: ScoreDetails;
  insights: SmartInsight[];
  mode: CalculatorMode;
  calculatedAt: string;
}

export interface HistoryRecord {
  id: string;
  createdAt: string;
  mode: CalculatorMode;
  totalTonnesCO2e: number;
  totalKgCO2e: number;
  score: number;
  scoreLabel: string;
  topCategoryName: string;
  topCategoryTonnes: number;
  categories: CategoryResult[];
  inputs: FullCalculatorInput;
}

export interface SustainabilityGoal {
  id: string;
  title: string;
  category: CategoryId;
  targetReductionKg: number;
  currentProgressKg: number;
  targetDate: string;
  isCompleted: boolean;
  createdAt: string;
  actionId?: string;
}

export interface EcoAction {
  id: string;
  title: string;
  category: CategoryId;
  impactLevel: 'High' | 'Medium' | 'Low';
  estimatedSavingKgPerYear: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  description: string;
  icon: string;
}

export interface CountryBenchmark {
  country: string;
  averageTonnesPerYear: number;
  code: string;
}
