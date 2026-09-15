import type { CountryBenchmark } from '../types/carbon';

export const VEHICLE_EMISSION_FACTORS = {
  petrol_car: 0.192, // kg CO2e per km
  diesel_car: 0.171,
  hybrid_car: 0.110,
  electric_car: 0.053,
  motorcycle: 0.103,
  scooter: 0.075,
  other: 0.150,
  petrol: 0.192,
  diesel: 0.171,
  hybrid: 0.110,
  electric: 0.053,
  cng: 0.120,
};

export const FUEL_EMISSION_FACTORS = {
  petrol_per_liter: 2.31, // kg CO2e per liter
  diesel_per_liter: 2.68,
  lpg_per_kg: 2.98,
  lpg_cylinder_14_2kg: 42.3, // kg CO2e per cylinder
  cng_per_kg: 2.75,
  png_per_m3: 1.95,
  natural_gas_per_m3: 2.00,
  firewood_per_kg: 1.83,
  charcoal_per_kg: 3.20,
};

export const GRID_ELECTRICITY_FACTORS: Record<string, number> = {
  India: 0.716, // kg CO2e per kWh
  USA: 0.385,
  UK: 0.207,
  Germany: 0.348,
  Canada: 0.120,
  Australia: 0.650,
  Default: 0.475, // Global average
};

export const PUBLIC_TRANSPORT_FACTORS = {
  bus: 0.089, // kg CO2e per km per passenger
  train: 0.035,
  metro: 0.028,
  autorickshaw: 0.065,
  taxi: 0.170,
  rideshare: 0.150,
};

export const DIET_BASELINES = {
  vegan: 1000, // kg CO2e per year
  vegetarian: 1400,
  eggetarian: 1600,
  pescatarian: 1800,
  low_meat: 2100,
  moderate_meat: 2500,
  high_meat: 3300,
  custom: 2000,
};

export const FOOD_ITEM_ANNUAL_KG = {
  beef: 280, // kg CO2e/year per weekly serving
  muttonLamb: 240,
  chicken: 70,
  fish: 55,
  eggs: 35,
  milk: 30,
  cheese: 120,
  curdYogurt: 40,
  rice: 25,
  wheat: 12,
  vegetables: 8,
  fruits: 10,
  pulses: 9,
  processed: 40,
  fastFood: 50,
};

export const FLIGHT_BASELINES = {
  domesticShort: 150, // kg CO2e per flight (< 800km)
  domesticMedium: 350, // 800 - 2500km
  domesticLong: 650, // > 2500km
  intlShort: 400,
  intlMedium: 950,
  intlLong: 1800,
};

export const SEATING_CLASS_MULTIPLIERS = {
  economy: 1.0,
  premium_economy: 1.3,
  business: 2.5,
  first: 3.5,
};

export const FLIGHT_PER_KM = 0.15; // kg CO2e per km direct

export const WATER_FACTORS = {
  perLiter: 0.0015, // kg CO2e per liter (pumping & treatment)
  perStandardShower: 0.40, // kg CO2e (water heating + supply)
  perLowFlowShower: 0.22,
  perBucketShower: 0.12,
  perBath: 0.75,
  perWashingMachineLoad: 0.55,
  perDishwasherLoad: 0.65,
};

export const WASTE_FACTORS = {
  perGeneralWasteKg: 0.45, // kg CO2e per kg
  perFoodWasteKg: 0.65,
  perPaperWasteKg: 0.30,
  perPlasticWasteKg: 0.85,
  perGlassWasteKg: 0.25,
  perMetalWasteKg: 0.35,
};

export const APPAREL_EMISSION_KG = {
  tshirt: 7,
  shirt: 12,
  jeans: 33,
  shoes: 14,
  jacket: 40,
  other: 10,
};

export const ELECTRONICS_EMISSION_KG = {
  smartphone: 70,
  laptop: 280,
  tablet: 120,
  tv: 450,
  smartwatch: 35,
  other: 90,
};

export const DIGITAL_FACTORS = {
  videoStreamingHrDay: 0.036 * 365, // kg CO2e / year per hr/day
  musicStreamingHrDay: 0.008 * 365,
  gamingHrDay: 0.065 * 365,
  videoConferencingHrWk: 0.045 * 52,
  cloudStoragePerGb: 0.002, // kg CO2e / GB / year
  deviceStandbyPerDevice: 15.0, // kg CO2e / year / device
};

export const LIFESTYLE_FACTORS = {
  hotelStayNight: 26.0, // kg CO2e / night
  outdoorActivity: 4.0,
  homeDelivery: 1.8, // delivery logistics
  onlineShoppingOrder: 3.5,
};

export const COUNTRY_BENCHMARKS: CountryBenchmark[] = [
  { country: 'World Average', averageTonnesPerYear: 4.7, code: 'GLOBAL' },
  { country: 'Paris Target 2030', averageTonnesPerYear: 2.0, code: 'TARGET' },
  { country: 'India', averageTonnesPerYear: 1.9, code: 'IN' },
  { country: 'United States', averageTonnesPerYear: 14.7, code: 'US' },
  { country: 'United Kingdom', averageTonnesPerYear: 5.2, code: 'UK' },
  { country: 'Germany', averageTonnesPerYear: 7.7, code: 'DE' },
  { country: 'Canada', averageTonnesPerYear: 14.2, code: 'CA' },
  { country: 'Australia', averageTonnesPerYear: 15.0, code: 'AU' },
  { country: 'Japan', averageTonnesPerYear: 8.5, code: 'JP' },
  { country: 'China', averageTonnesPerYear: 8.0, code: 'CN' },
  { country: 'Brazil', averageTonnesPerYear: 2.2, code: 'BR' },
];
