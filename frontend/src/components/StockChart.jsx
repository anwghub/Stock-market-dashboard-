import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

export default function StockChart({ stockData }) {
  const chartData = useMemo(() => {
    if (!stockData?.data?.length) return null;

    return {
      labels: stockData.data.map(item => new Date(item.date)), // ✅ Convert to Date
      datasets: [
        {
          label: stockData.symbol,
          data: stockData.data.map(item => Number(item.close)), // ✅ Ensure number
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.3
        }
      ]
    };
  }, [stockData]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" }
    },
    scales: {
      x: { type: "time", time: { unit: "day" } },
      y: { beginAtZero: false }
    }
  };

  if (!chartData) return <p>Loading chart...</p>;

  return <Line data={chartData} options={options} />;
}
