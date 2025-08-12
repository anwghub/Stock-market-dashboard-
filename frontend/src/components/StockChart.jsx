// import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function StockChart({ data = [], symbol, predictionObj = null }) {
  // data expected: array of { Date: 'YYYY-MM-DD', Close: number, ... }
  const points = useMemo(() => {
    return data.map((d) => ({ x: d.Date, y: Number(d.Close) }));
  }, [data]);

  const predictedPoint = useMemo(() => {
    if (!predictionObj || !data || data.length === 0) return null;
    const lastDate = new Date(data[data.length - 1].Date);
    const nextDate = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);
    return { x: nextDate.toISOString().slice(0, 10), y: Number(predictionObj.predicted_close) };
  }, [data, predictionObj]);

  const chartData = {
    datasets: [
      {
        label: `${symbol || "Symbol"} Close`,
        data: points,
        tension: 0.2,
        borderWidth: 2,
        borderColor: "rgba(99,102,241,1)", // indigo-500
        pointRadius: 0,
      },
      ...(predictedPoint
        ? [
            {
              label: "Predicted Next Day",
              data: [predictedPoint],
              pointRadius: 8,
              pointBackgroundColor: "rgb(239,68,68)", // red-500
              showLine: false,
            },
          ]
        : []),
    ],
  };

  const opts = {
    parsing: false,
    normalized: true,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { type: "time", time: { unit: "month" } },
      y: { beginAtZero: false },
    },
    plugins: {
      legend: { display: true },
      tooltip: { mode: "index", intersect: false },
    },
  };

  return (
    <div style={{ height: "60vh" }}>
      <Line data={chartData} options={opts} />
    </div>
  );
}
