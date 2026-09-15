export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatTonnes(value: number): string {
  return `${formatNumber(value, 2)} t CO₂e`;
}

export function formatKg(value: number): string {
  return `${formatNumber(value, 0)} kg CO₂e`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatPercent(value: number): string {
  return `${formatNumber(value, 1)}%`;
}
