import type { CategoryResult, SmartInsight } from '../types/carbon';

export function generateSmartInsights(categories: CategoryResult[], totalKgCO2e: number): SmartInsight[] {
  const insights: SmartInsight[] = [];
  if (!categories || categories.length === 0 || totalKgCO2e <= 0) return insights;

  const sorted = [...categories].sort((a, b) => b.kgCO2e - a.kgCO2e);
  const topCategory = sorted[0];

  if (topCategory && topCategory.kgCO2e > 0) {
    const topPct = Math.round(topCategory.percentage);

    if (topCategory.id === 'transportation') {
      insights.push({
        id: 'insight-top-transport',
        categoryId: 'transportation',
        title: `Transportation is your largest emission source (${topPct}% of total)`,
        description: `Your vehicle travel generates approx ${Math.round(topCategory.kgCO2e)} kg CO₂e per year. Solo driving in fossil-fuel vehicles contributes heavily to your footprint.`,
        impactKg: Math.round(topCategory.kgCO2e * 0.3),
        impactPercentage: Math.round(topPct * 0.3),
        tip: 'Switching 2 weekly car trips to public transit or carpooling could reduce your footprint by up to ~500 kg CO₂e/year.',
        priority: 'high',
      });
    } else if (topCategory.id === 'electricity') {
      insights.push({
        id: 'insight-top-electricity',
        categoryId: 'electricity',
        title: `Electricity & Home Energy dominates your footprint (${topPct}%)`,
        description: `Home energy consumption contributes ${Math.round(topCategory.kgCO2e)} kg CO₂e/year due to fossil-fuel-heavy grid power or heavy appliance loads like ACs.`,
        impactKg: Math.round(topCategory.kgCO2e * 0.25),
        impactPercentage: Math.round(topPct * 0.25),
        tip: 'Setting your AC to 24°C (75°F) and switching to LED lighting could save ~350 kg CO₂e/year.',
        priority: 'high',
      });
    } else if (topCategory.id === 'food') {
      insights.push({
        id: 'insight-top-food',
        categoryId: 'food',
        title: `Diet & Food choices are driving your emissions (${topPct}%)`,
        description: `Food consumption accounts for ${Math.round(topCategory.kgCO2e)} kg CO₂e/year. Animal agriculture, red meat, and food waste add significant greenhouse gases.`,
        impactKg: Math.round(topCategory.kgCO2e * 0.25),
        impactPercentage: Math.round(topPct * 0.25),
        tip: 'Replacing red meat with plant-based options twice a week can cut diet emissions by up to 300 kg CO₂e/year.',
        priority: 'high',
      });
    } else if (topCategory.id === 'flights') {
      insights.push({
        id: 'insight-top-flights',
        categoryId: 'flights',
        title: `Aviation & Travel accounts for ${topPct}% of your carbon impact`,
        description: `Air travel contributes ${Math.round(topCategory.kgCO2e)} kg CO₂e/year. High-altitude emissions have an intensified radiative forcing impact.`,
        impactKg: Math.round(topCategory.kgCO2e * 0.4),
        impactPercentage: Math.round(topPct * 0.4),
        tip: 'Choosing train travel for medium distances or combining business trips can eliminate several flight emissions.',
        priority: 'high',
      });
    } else {
      insights.push({
        id: 'insight-top-general',
        categoryId: topCategory.id,
        title: `${topCategory.name} is your highest emission category (${topPct}%)`,
        description: `This category accounts for ${Math.round(topCategory.kgCO2e)} kg CO₂e/year of your annual footprint.`,
        impactKg: Math.round(topCategory.kgCO2e * 0.2),
        impactPercentage: Math.round(topPct * 0.2),
        tip: `Targeting improvements in ${topCategory.name.toLowerCase()} offers your best opportunity for carbon reduction.`,
        priority: 'high',
      });
    }
  }

  const foodCat = categories.find((c) => c.id === 'food');
  if (foodCat && foodCat.kgCO2e > 1200 && topCategory.id !== 'food') {
    insights.push({
      id: 'insight-sec-food',
      categoryId: 'food',
      title: 'High Dietary Impact Detected',
      description: `Your diet generates ${Math.round(foodCat.kgCO2e)} kg CO₂e/year. Animal proteins and food waste are major factors.`,
      impactKg: Math.round(foodCat.kgCO2e * 0.2),
      impactPercentage: Math.round(foodCat.percentage * 0.2),
      tip: 'Reducing food waste by 50% through meal planning eliminates landfill methane and saves money.',
      priority: 'medium',
    });
  }

  const wasteCat = categories.find((c) => c.id === 'waste');
  if (wasteCat && wasteCat.kgCO2e > 250) {
    insights.push({
      id: 'insight-sec-waste',
      categoryId: 'waste',
      title: 'Recycling & Composting Opportunity',
      description: `Household waste generates ${Math.round(wasteCat.kgCO2e)} kg CO₂e/year. Organic waste in landfills releases potent methane gas.`,
      impactKg: Math.round(wasteCat.kgCO2e * 0.6),
      impactPercentage: Math.round(wasteCat.percentage * 0.6),
      tip: 'Composting food scraps and recycling rigid plastics can cut waste footprint by over 50%.',
      priority: 'low',
    });
  }

  const shoppingCat = categories.find((c) => c.id === 'shopping');
  if (shoppingCat && shoppingCat.kgCO2e > 400) {
    insights.push({
      id: 'insight-sec-shopping',
      categoryId: 'shopping',
      title: 'Consumer Goods & Circular Economy',
      description: `Purchasing new apparel and electronics adds ${Math.round(shoppingCat.kgCO2e)} kg CO₂e/year in embodied supply chain emissions.`,
      impactKg: Math.round(shoppingCat.kgCO2e * 0.3),
      impactPercentage: Math.round(shoppingCat.percentage * 0.3),
      tip: 'Opting for secondhand clothes and repairing electronics extends product life and slashes manufacturing emissions.',
      priority: 'medium',
    });
  }

  return insights;
}
