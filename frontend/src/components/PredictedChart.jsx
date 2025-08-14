import React, { useMemo } from "react";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

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

export default function PredictedChart({ prediction }) {
  const chartData = useMemo(() => {
    if (!prediction) return { labels: [], datasets: [] };

    const labels = [
      new Date(prediction.last_date || prediction.predicted_date), // last close date (if available)
      new Date(prediction.predicted_date),
    ];
    const values = [prediction.last_close, prediction.predicted_close];

    return {
      labels,
      datasets: [
        {
          label: "Price Prediction",
          data: values,
          borderColor: "rgba(91, 33, 182, 1)",
          backgroundColor: "rgba(91, 33, 182, 0.3)",
          fill: false,
          tension: 0.1,
          pointRadius: 8,
          pointHoverRadius: 10,
          pointStyle: "circle",
        },
      ],
    };
  }, [prediction]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Prediction" },
    },
    scales: {
      x: { type: "time", time: { unit: "day" } },
      y: { beginAtZero: false },
    },
  };

  return (
    <div className="w-full h-[400px] pl-16 pb-6">
      <Line data={chartData} options={options} />
    </div>
  );
}
