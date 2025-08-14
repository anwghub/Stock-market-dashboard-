import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockData, getPrediction } from "../service/stockServices.js";
import PredictedChart from "../components/PredictedChart.jsx";

export default function PredictionPage() {
  const { symbol } = useParams();
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;
    Promise.all([getStockData(symbol, "6mo", "1d"), getPrediction(symbol)])
      .then(([stockRes, predRes]) => {
        setHistory(stockRes.data.data || []); 
        setPrediction(predRes.prediction || null); 
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [symbol]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-purple-900 p-6 pt-[150px]">
      <div className="max-w-6xl mx-auto w-[900px]">
        <h2 className="text-center text-2xl font-bold mb-7">
          Next Day Prediction — {symbol}
        </h2>
        {loading ? (
          <div className="py-20 text-center">Loading prediction...</div>
        ) : (
          <div className="bg-white rounded-xl shadow p-4">
            <div className="mb-4">
              <div className="text-slate-800 text-lg">
                Last Close: <strong>{prediction?.last_close}</strong>
              </div>
              <div className="text-slate-800 text-lg">
                Predicted ({prediction?.predicted_date}):{" "}
                <strong>{prediction?.predicted_close}</strong>
              </div>
            </div>

            <PredictedChart history={history} prediction={prediction} />

            <div className="mt-4 text-md text-gray-600">
              <strong>Model notes:</strong> {prediction?.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
