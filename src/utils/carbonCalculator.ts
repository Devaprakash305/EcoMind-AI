import type {
  FullCalculatorInput,
  CalculationResult,
  CategoryResult,
  ScoreDetails,
  CategoryId,
} from '../types/carbon';
import {
  VEHICLE_EMISSION_FACTORS,
  FUEL_EMISSION_FACTORS,
  GRID_ELECTRICITY_FACTORS,
  PUBLIC_TRANSPORT_FACTORS,
  DIET_BASELINES,
  FOOD_ITEM_ANNUAL_KG,
  FLIGHT_BASELINES,
  SEATING_CLASS_MULTIPLIERS,
  WATER_FACTORS,
  WASTE_FACTORS,
  APPAREL_EMISSION_KG,
  ELECTRONICS_EMISSION_KG,
  DIGITAL_FACTORS,
  LIFESTYLE_FACTORS,
} from '../data/emissionFactors';
import { generateSmartInsights } from './insightsGenerator';

export function calculateCarbonFootprint(input: FullCalculatorInput): CalculationResult {
  const isQuickMode = input.mode === 'quick';

  let transportKg = 0;
  let publicTransportKg = 0;
  let electricityKg = 0;
  let cookingKg = 0;
  let foodKg = 0;
  let flightsKg = 0;
  let waterKg = 0;
  let wasteKg = 0;
  let shoppingKg = 0;
  let digitalKg = 0;
  let lifestyleKg = 0;

  const country = input.personal?.country || 'Default';
  const gridFactor = GRID_ELECTRICITY_FACTORS[country] || GRID_ELECTRICITY_FACTORS['Default'];
  const householdSize = Math.max(1, input.personal?.householdSize || 1);

  if (isQuickMode && input.quickEstimate) {
    const q = input.quickEstimate;
    // 1. Transport Quick
    const fuelKey = q.fuelType as keyof typeof VEHICLE_EMISSION_FACTORS;
    const fuelFac = VEHICLE_EMISSION_FACTORS[fuelKey] || VEHICLE_EMISSION_FACTORS.petrol_car;
    transportKg = q.carKmPerWeek * 52 * fuelFac;

    // 2. Public transport Quick
    publicTransportKg = q.publicTransportKmPerWeek * 52 * PUBLIC_TRANSPORT_FACTORS.bus;

    // 3. Electricity Quick
    let annualKwh = 0;
    if (q.isKwh) {
      annualKwh = q.electricityBillOrKwh * 12;
    } else {
      annualKwh = (q.electricityBillOrKwh / 8) * 12;
    }
    electricityKg = annualKwh * gridFactor;

    // 4. Food Quick
    foodKg = DIET_BASELINES[q.dietType] || DIET_BASELINES.moderate_meat;

    // 5. Flights Quick
    flightsKg = q.flightsPerYear * FLIGHT_BASELINES.domesticMedium;

    // 6. Waste Quick
    const wasteFactorMap = { low: 150, moderate: 300, high: 500 };
    wasteKg = wasteFactorMap[q.wasteHabit] || 300;

    // 7. Shopping Quick
    const shoppingFactorMap = { minimal: 200, moderate: 450, frequent: 900 };
    shoppingKg = shoppingFactorMap[q.shoppingHabit] || 450;

    cookingKg = 250;
    waterKg = 120;
    digitalKg = 90;
    lifestyleKg = 150;
  } else {
    // DETAILED ESTIMATE MODE
    // 1. Personal Vehicles
    if (input.vehicles && input.vehicles.length > 0) {
      input.vehicles.forEach((v) => {
        const factor = VEHICLE_EMISSION_FACTORS[v.vehicleType] || VEHICLE_EMISSION_FACTORS.petrol_car;
        const totalAnnualKm = v.dailyDistanceKm * (v.daysPerWeek || 7) * (v.weeksPerYear || 52);
        const passCount = Math.max(1, v.passengers || 1);
        transportKg += (totalAnnualKm * factor) / passCount;
      });
    }

    // Direct Fuel
    if (input.directFuel) {
      const df = input.directFuel;
      transportKg += df.petrolLitersPerMonth * 12 * FUEL_EMISSION_FACTORS.petrol_per_liter;
      transportKg += df.dieselLitersPerMonth * 12 * FUEL_EMISSION_FACTORS.diesel_per_liter;
      transportKg += df.cngKgPerMonth * 12 * FUEL_EMISSION_FACTORS.cng_per_kg;
      transportKg += df.evElectricityKwhPerMonth * 12 * gridFactor;
    }

    // Public Transport
    if (input.publicTransport) {
      const pt = input.publicTransport;
      publicTransportKg += pt.busKmPerWeek * 52 * PUBLIC_TRANSPORT_FACTORS.bus;
      publicTransportKg += pt.trainKmPerWeek * 52 * PUBLIC_TRANSPORT_FACTORS.train;
      publicTransportKg += pt.metroKmPerWeek * 52 * PUBLIC_TRANSPORT_FACTORS.metro;
      publicTransportKg += pt.autorickshawKmPerWeek * 52 * PUBLIC_TRANSPORT_FACTORS.autorickshaw;
      publicTransportKg += pt.taxiKmPerWeek * 52 * PUBLIC_TRANSPORT_FACTORS.taxi;
      publicTransportKg += pt.rideshareKmPerWeek * 52 * PUBLIC_TRANSPORT_FACTORS.rideshare;
    }

    // Electricity & Energy
    if (input.energy) {
      const e = input.energy;
      let totalAnnualKwh = 0;

      if (e.knowsExactKwh && e.monthlyKwh) {
        totalAnnualKwh = e.monthlyKwh * 12;
      } else if (e.monthlyBillAmount > 0) {
        totalAnnualKwh = (e.monthlyBillAmount / 8) * 12;
      }

      if (e.appliances && e.appliances.length > 0) {
        let applianceAnnualKwh = 0;
        e.appliances.forEach((app) => {
          const kwhPerDay = (app.quantity * app.powerWatts * app.hoursPerDay) / 1000;
          const kwhPerYear = kwhPerDay * (app.daysPerMonth * 12);
          applianceAnnualKwh += kwhPerYear;
        });
        if (applianceAnnualKwh > 0) {
          totalAnnualKwh = Math.max(totalAnnualKwh, applianceAnnualKwh);
        }
      }

      let grossElectricityKg = totalAnnualKwh * gridFactor;
      const cleanEnergyPct = Math.min(100, (e.renewablePercentage || 0) + (e.solarPanelPercentage || 0));
      grossElectricityKg = grossElectricityKg * (1 - cleanEnergyPct / 100);

      electricityKg = grossElectricityKg;
    }

    // Cooking & Household Fuel
    if (input.cooking) {
      const c = input.cooking;
      cookingKg += c.lpgCylindersPerMonth * 12 * FUEL_EMISSION_FACTORS.lpg_cylinder_14_2kg;
      cookingKg += c.pngUnitsPerMonth * 12 * FUEL_EMISSION_FACTORS.png_per_m3;
      cookingKg += c.firewoodKgPerMonth * 12 * FUEL_EMISSION_FACTORS.firewood_per_kg;
      cookingKg += c.charcoalKgPerMonth * 12 * FUEL_EMISSION_FACTORS.charcoal_per_kg;
      cookingKg += c.electricityKwhPerMonth * 12 * gridFactor;
    }

    // Food & Diet
    if (input.food) {
      const f = input.food;
      let baseFoodKg = DIET_BASELINES[f.dietType] || DIET_BASELINES.vegetarian;

      if (f.useDetailedFoodInput && f.frequencies) {
        let detailedSum = 0;
        const freq = f.frequencies;
        detailedSum += (freq.beef || 0) * FOOD_ITEM_ANNUAL_KG.beef;
        detailedSum += (freq.muttonLamb || 0) * FOOD_ITEM_ANNUAL_KG.muttonLamb;
        detailedSum += (freq.chicken || 0) * FOOD_ITEM_ANNUAL_KG.chicken;
        detailedSum += (freq.fish || 0) * FOOD_ITEM_ANNUAL_KG.fish;
        detailedSum += (freq.eggs || 0) * FOOD_ITEM_ANNUAL_KG.eggs;
        detailedSum += (freq.milk || 0) * FOOD_ITEM_ANNUAL_KG.milk;
        detailedSum += (freq.cheese || 0) * FOOD_ITEM_ANNUAL_KG.cheese;
        detailedSum += (freq.curdYogurt || 0) * FOOD_ITEM_ANNUAL_KG.curdYogurt;
        detailedSum += (freq.rice || 0) * FOOD_ITEM_ANNUAL_KG.rice;
        detailedSum += (freq.wheat || 0) * FOOD_ITEM_ANNUAL_KG.wheat;
        detailedSum += (freq.vegetables || 0) * FOOD_ITEM_ANNUAL_KG.vegetables;
        detailedSum += (freq.fruits || 0) * FOOD_ITEM_ANNUAL_KG.fruits;
        detailedSum += (freq.pulses || 0) * FOOD_ITEM_ANNUAL_KG.pulses;
        detailedSum += (freq.processed || 0) * FOOD_ITEM_ANNUAL_KG.processed;
        detailedSum += (freq.fastFood || 0) * FOOD_ITEM_ANNUAL_KG.fastFood;

        if (detailedSum > 0) {
          baseFoodKg = detailedSum;
        }
      }

      const wasteMultiplier = 1 + (f.foodWastePercentage || 10) / 100;
      const importMultiplier = 1 + ((f.importedPercentage || 10) / 100) * 0.15;
      const organicDeduction = 1 - ((f.organicPercentage || 0) / 100) * 0.05;

      foodKg = baseFoodKg * wasteMultiplier * importMultiplier * organicDeduction;
    }

    // Flights & Travel
    if (input.flights) {
      const fl = input.flights;
      const classMultiplier = SEATING_CLASS_MULTIPLIERS[fl.flightClass || 'economy'];

      if (fl.knowsDirectDistance && fl.directDistanceKmPerYear > 0) {
        flightsKg = fl.directDistanceKmPerYear * 0.15 * classMultiplier;
      } else {
        let totalFlightKg = 0;
        totalFlightKg += (fl.domesticShortFlightsPerYear || 0) * FLIGHT_BASELINES.domesticShort;
        totalFlightKg += (fl.domesticMediumFlightsPerYear || 0) * FLIGHT_BASELINES.domesticMedium;
        totalFlightKg += (fl.domesticLongFlightsPerYear || 0) * FLIGHT_BASELINES.domesticLong;
        totalFlightKg += (fl.intlShortFlightsPerYear || 0) * FLIGHT_BASELINES.intlShort;
        totalFlightKg += (fl.intlMediumFlightsPerYear || 0) * FLIGHT_BASELINES.intlMedium;
        totalFlightKg += (fl.intlLongFlightsPerYear || 0) * FLIGHT_BASELINES.intlLong;

        flightsKg = totalFlightKg * classMultiplier;
      }
    }

    // Water Usage
    if (input.water) {
      const w = input.water;
      if (w.knowsDirectLiters && w.directDailyLiters) {
        waterKg = w.directDailyLiters * 365 * WATER_FACTORS.perLiter;
      } else {
        const showerFactorMap = {
          standard: WATER_FACTORS.perStandardShower,
          low_flow: WATER_FACTORS.perLowFlowShower,
          bucket: WATER_FACTORS.perBucketShower,
        };
        const sFactor = showerFactorMap[w.showerType || 'standard'];
        let annualShowerKg = (w.showersPerWeek || 7) * 52 * sFactor;
        let annualBathKg = (w.bathsPerWeek || 0) * 52 * WATER_FACTORS.perBath;
        let annualWashingKg = (w.washingMachineLoadsPerWeek || 3) * 52 * WATER_FACTORS.perWashingMachineLoad;
        let annualDishwasherKg = (w.dishwasherLoadsPerWeek || 0) * 52 * WATER_FACTORS.perDishwasherLoad;

        waterKg = annualShowerKg + annualBathKg + annualWashingKg + annualDishwasherKg;
      }
    }

    // Waste Generation
    if (input.waste) {
      const wst = input.waste;
      let grossWasteKg = 0;

      if (wst.knowsDetailedWaste) {
        grossWasteKg += (wst.foodWasteKgPerWeek || 0) * 52 * WASTE_FACTORS.perFoodWasteKg;
        grossWasteKg += (wst.paperWasteKgPerWeek || 0) * 52 * WASTE_FACTORS.perPaperWasteKg;
        grossWasteKg += (wst.plasticWasteKgPerWeek || 0) * 52 * WASTE_FACTORS.perPlasticWasteKg;
        grossWasteKg += (wst.glassWasteKgPerWeek || 0) * 52 * WASTE_FACTORS.perGlassWasteKg;
        grossWasteKg += (wst.metalWasteKgPerWeek || 0) * 52 * WASTE_FACTORS.perMetalWasteKg;
      } else {
        grossWasteKg = (wst.totalWasteKgPerWeek || 5) * 52 * WASTE_FACTORS.perGeneralWasteKg;
      }

      const recycleCredit = ((wst.recycledPercentage || 0) / 100) * 0.60;
      const compostCredit = ((wst.compostedPercentage || 0) / 100) * 0.80;
      const netMultiplier = Math.max(0.1, 1 - (recycleCredit + compostCredit));

      wasteKg = grossWasteKg * netMultiplier;
    }

    // Shopping & Consumer Goods
    if (input.shopping) {
      const sh = input.shopping;
      if (sh.knowsDetailedShopping) {
        let grossShopping = 0;
        grossShopping += (sh.clothingItemsPerYear || 0) * APPAREL_EMISSION_KG.shirt;
        grossShopping += (sh.electronicsItemsPerYear || 0) * ELECTRONICS_EMISSION_KG.smartphone;
        grossShopping += (sh.householdItemsPerYear || 0) * 50;

        const newPct = (sh.newPurchasesPercentage || 100) / 100;
        const secondPct = (sh.secondhandPercentage || 0) / 100;
        const repairPct = (sh.repairedPercentage || 0) / 100;

        const weightedMultiplier = newPct * 1.0 + secondPct * 0.25 + repairPct * 0.15;
        shoppingKg = grossShopping * weightedMultiplier;
      } else {
        shoppingKg = (sh.monthlySpendAmount || 100) * 12 * 0.25;
      }
    }

    // Digital Usage
    if (input.digital) {
      const d = input.digital;
      digitalKg += (d.videoStreamingHoursPerDay || 0) * DIGITAL_FACTORS.videoStreamingHrDay;
      digitalKg += (d.musicStreamingHoursPerDay || 0) * DIGITAL_FACTORS.musicStreamingHrDay;
      digitalKg += (d.gamingHoursPerDay || 0) * DIGITAL_FACTORS.gamingHrDay;
      digitalKg += (d.videoConferencingHoursPerWeek || 0) * DIGITAL_FACTORS.videoConferencingHrWk;
      digitalKg += (d.cloudStorageGb || 0) * DIGITAL_FACTORS.cloudStoragePerGb;
      digitalKg += (d.devicesCount || 0) * DIGITAL_FACTORS.deviceStandbyPerDevice;
    }

    // Lifestyle & Other
    if (input.lifestyle) {
      const l = input.lifestyle;
      lifestyleKg += (l.hotelStaysPerYear || 0) * LIFESTYLE_FACTORS.hotelStayNight;
      lifestyleKg += (l.outdoorActivitiesCount || 0) * LIFESTYLE_FACTORS.outdoorActivity;
      lifestyleKg += (l.homeDeliveriesPerMonth || 0) * 12 * LIFESTYLE_FACTORS.homeDelivery;
      lifestyleKg += (l.onlineShoppingOrdersPerMonth || 0) * 12 * LIFESTYLE_FACTORS.onlineShoppingOrder;
      lifestyleKg += l.customOtherEmissionsKgPerYear || 0;
    }
  }

  // Divide household shared emissions by household size
  electricityKg = electricityKg / householdSize;
  cookingKg = cookingKg / householdSize;
  waterKg = waterKg / householdSize;
  wasteKg = wasteKg / householdSize;

  const totalKgCO2e = Math.round(
    transportKg +
      publicTransportKg +
      electricityKg +
      cookingKg +
      foodKg +
      flightsKg +
      waterKg +
      wasteKg +
      shoppingKg +
      digitalKg +
      lifestyleKg
  );

  const totalTonnesCO2e = Number((totalKgCO2e / 1000).toFixed(2));
  const monthlyKgCO2e = Math.round(totalKgCO2e / 12);
  const dailyKgCO2e = Number((totalKgCO2e / 365).toFixed(1));
  const perPersonKgCO2e = totalKgCO2e;
  const perPersonTonnesCO2e = totalTonnesCO2e;

  const rawCategories: { id: CategoryId; name: string; kgCO2e: number; color: string; iconName: string }[] = [
    { id: 'transportation', name: 'Personal Transport', kgCO2e: Math.round(transportKg), color: '#10B981', iconName: 'Car' },
    { id: 'public_transport', name: 'Public Transport', kgCO2e: Math.round(publicTransportKg), color: '#3B82F6', iconName: 'Bus' },
    { id: 'electricity', name: 'Home Energy', kgCO2e: Math.round(electricityKg), color: '#F59E0B', iconName: 'Zap' },
    { id: 'cooking', name: 'Cooking & Fuel', kgCO2e: Math.round(cookingKg), color: '#EF4444', iconName: 'Flame' },
    { id: 'food', name: 'Food & Diet', kgCO2e: Math.round(foodKg), color: '#8B5CF6', iconName: 'Utensils' },
    { id: 'flights', name: 'Flights & Travel', kgCO2e: Math.round(flightsKg), color: '#06B6D4', iconName: 'Plane' },
    { id: 'water', name: 'Water Usage', kgCO2e: Math.round(waterKg), color: '#0EA5E9', iconName: 'Droplet' },
    { id: 'waste', name: 'Waste Generation', kgCO2e: Math.round(wasteKg), color: '#84CC16', iconName: 'Trash2' },
    { id: 'shopping', name: 'Shopping & Goods', kgCO2e: Math.round(shoppingKg), color: '#EC4899', iconName: 'ShoppingBag' },
    { id: 'digital', name: 'Digital Footprint', kgCO2e: Math.round(digitalKg), color: '#6366F1', iconName: 'Laptop' },
    { id: 'lifestyle', name: 'Lifestyle & Other', kgCO2e: Math.round(lifestyleKg), color: '#64748B', iconName: 'Compass' },
  ];

  const categories: CategoryResult[] = rawCategories.map((c) => {
    const pct = totalKgCO2e > 0 ? (c.kgCO2e / totalKgCO2e) * 100 : 0;
    return {
      id: c.id,
      name: c.name,
      kgCO2e: c.kgCO2e,
      tonnesCO2e: Number((c.kgCO2e / 1000).toFixed(2)),
      percentage: Number(pct.toFixed(1)),
      color: c.color,
      iconName: c.iconName,
    };
  });

  let numericScore = 100;
  if (totalTonnesCO2e <= 2.0) {
    numericScore = Math.round(90 + (2.0 - totalTonnesCO2e) * 5);
  } else if (totalTonnesCO2e <= 5.0) {
    numericScore = Math.round(90 - ((totalTonnesCO2e - 2.0) / 3.0) * 30);
  } else if (totalTonnesCO2e <= 12.0) {
    numericScore = Math.round(60 - ((totalTonnesCO2e - 5.0) / 7.0) * 40);
  } else {
    numericScore = Math.max(5, Math.round(20 - (totalTonnesCO2e - 12.0) * 2));
  }
  numericScore = Math.min(100, Math.max(0, numericScore));

  let scoreDetails: ScoreDetails;
  if (numericScore >= 80) {
    scoreDetails = {
      score: numericScore,
      label: 'Excellent',
      color: '#10B981',
      description: 'Your carbon footprint is aligned with planetary climate goals and sustainable living benchmarks.',
    };
  } else if (numericScore >= 60) {
    scoreDetails = {
      score: numericScore,
      label: 'Good',
      color: '#3B82F6',
      description: 'Your footprint is lower than average, with minor lifestyle optimizations available to reach Paris targets.',
    };
  } else if (numericScore >= 40) {
    scoreDetails = {
      score: numericScore,
      label: 'Moderate',
      color: '#F59E0B',
      description: 'Your footprint is around national/global average levels. High-impact reduction steps are recommended.',
    };
  } else if (numericScore >= 20) {
    scoreDetails = {
      score: numericScore,
      label: 'High Impact',
      color: '#F97316',
      description: 'Your activities generate significant greenhouse gas emissions. Strategic changes will yield huge savings.',
    };
  } else {
    scoreDetails = {
      score: numericScore,
      label: 'Very High Impact',
      color: '#EF4444',
      description: 'Your lifestyle emissions are significantly above sustainable thresholds. Urgent action is needed.',
    };
  }

  const insights = generateSmartInsights(categories, totalKgCO2e);

  return {
    totalKgCO2e,
    totalTonnesCO2e,
    monthlyKgCO2e,
    dailyKgCO2e,
    perPersonKgCO2e,
    perPersonTonnesCO2e,
    categories,
    score: scoreDetails,
    insights,
    mode: input.mode,
    calculatedAt: new Date().toISOString(),
  };
}
