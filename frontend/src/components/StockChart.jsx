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
  TimeScale,
  Filler
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler
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
          borderColor: "rgb(123, 31, 162)",
          backgroundColor: "rgba(221, 214, 254, 0.5)",
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

  return (<Line data={chartData} options={options} className="pl-20" />);
}
