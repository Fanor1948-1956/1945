import { generateMockData } from './data.js';

export function drawChart(canvasId, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = 30;
  const barSpacing = 10;
  const baseHeight = canvas.height - 30;
  const maxValue = Math.max(...data.map((d) => d.value));

  data.forEach((item, index) => {
    const barHeight = (item.value / maxValue) * (baseHeight - 30);
    ctx.fillStyle = 'rgba(0, 123, 255, 0.7)';
    ctx.fillRect(
      index * (barWidth + barSpacing),
      baseHeight - barHeight,
      barWidth,
      barHeight
    );
    ctx.fillStyle = '#333';
    ctx.fillText(
      item.value,
      index * (barWidth + barSpacing),
      baseHeight - barHeight - 5
    );
  });
}

export function initializeCharts(canvasId, year) {
  const mockData = generateMockData(2); // Generar datos de 2 años

  // Filtrar datos para el año seleccionado
  const yearData = mockData.find((data) => data.year == year);
  if (!yearData) return;

  // Dibujar el gráfico con los datos filtrados
  yearData.months.forEach((monthData) => {
    drawChart(canvasId, monthData.days);
  });
}
