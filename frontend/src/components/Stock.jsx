import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
//import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function StockChart({ data = [], symbol }) {
  const chartData = useMemo(() => {
    const labels = data.map(d => d.Date || d.date || d.datetime);
    const prices = data.map(d =>
      Number(d.Close ?? d.close ?? d.adjclose ?? 0)
    );

    return {
      labels,
      datasets: [
        {
          label: symbol ? `${symbol} Close` : 'Price',
          data: prices,
          tension: 0.15,
          borderWidth: 2,
          pointRadius: 0,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
        },
      ],
    };
  }, [data, symbol]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        title: { display: false },
      },
      scales: {
        x: {
          type: 'time',
          time: { unit: 'day', tooltipFormat: 'MMM dd, yyyy' },
        },
        y: {
          ticks: { beginAtZero: false },
        },
      },
    }),
    []
  );

  return (
    <div style={{ height: '60vh' }}>
      <div className="mb-2 text-sm text-gray-500">
        {symbol
          ? `${symbol} — Last ${data.length} points`
          : 'Select a company'}
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}
