import type { CalculationResult } from '../types/carbon';
import { formatNumber } from './formatters';

export function exportResultAsJson(result: CalculationResult): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `ecomind_footprint_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function printSummaryReport(result: CalculationResult): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to generate the printable report.');
    return;
  }

  const categoryRows = result.categories
    .map(
      (cat) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: left; font-weight: 500;">${cat.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">${formatNumber(cat.kgCO2e)} kg</td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">${cat.tonnesCO2e} t</td>
      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: bold; color: ${cat.color};">${cat.percentage}%</td>
    </tr>
  `
    )
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>EcoMind AI - Carbon Footprint Summary</title>
        <style>
          body { font-family: 'Segoe UI', Roboto, Helvetica, sans-serif; color: #1e293b; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { border-bottom: 2px solid #059669; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 24px; font-weight: bold; color: #059669; }
          .badge { background-color: #ecfdf5; color: #047857; padding: 6px 12px; border-radius: 9999px; font-size: 14px; font-weight: 600; }
          .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 30px; }
          .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 15px; }
          .stat-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center; }
          .stat-value { font-size: 22px; font-weight: bold; color: #0f172a; }
          .stat-label { font-size: 12px; color: #64748b; margin-top: 4px; text-transform: uppercase; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #f1f5f9; padding: 12px; font-size: 13px; text-transform: uppercase; color: #475569; border-bottom: 2px solid #cbd5e1; text-align: left; }
          .footer { font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 40px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🌿 EcoMind AI</div>
          <div class="badge">Score: ${result.score.score}/100 (${result.score.label})</div>
        </div>

        <div class="summary-card">
          <h2 style="margin: 0 0 10px 0; color: #0f172a;">Carbon Footprint Summary</h2>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Calculated on ${new Date(result.calculatedAt).toLocaleDateString()} (${result.mode.toUpperCase()} Mode)</p>
          <div class="stat-grid">
            <div class="stat-box">
              <div class="stat-value">${result.totalTonnesCO2e} t</div>
              <div class="stat-label">Annual Footprint</div>
            </div>
            <div class="stat-box">
              <div class="stat-value">${formatNumber(result.monthlyKgCO2e)} kg</div>
              <div class="stat-label">Monthly Avg</div>
            </div>
            <div class="stat-box">
              <div class="stat-value">${result.dailyKgCO2e} kg</div>
              <div class="stat-label">Daily Avg</div>
            </div>
            <div class="stat-box">
              <div class="stat-value">${result.score.score} / 100</div>
              <div class="stat-label">Eco Score</div>
            </div>
          </div>
        </div>

        <h3 style="color: #0f172a; margin-bottom: 15px;">Category Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th style="text-align: right;">kg CO₂e/yr</th>
              <th style="text-align: right;">Tonnes</th>
              <th style="text-align: right;">Share %</th>
            </tr>
          </thead>
          <tbody>
            ${categoryRows}
          </tbody>
        </table>

        <div class="footer">
          EcoMind AI — Intelligent Carbon Footprint & Sustainability Platform. Calculated values are educational estimates based on standard international emission factors.
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
