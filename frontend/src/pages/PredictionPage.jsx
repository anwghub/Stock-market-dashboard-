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
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-purple-900 pt-[120px] px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full">
        
        <h2 className="text-center text-xl sm:text-2xl font-bold mb-6 sm:mb-7">
          Next Day Prediction — {symbol}
        </h2>

        {loading ? (
          <div className="py-16 sm:py-20 text-center text-white">
            Loading prediction...
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            
            {/* Prediction Info */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="text-slate-800 text-base sm:text-lg">
                Last Close: <strong>{prediction?.last_close}</strong>
              </div>
              <div className="text-slate-800 text-base sm:text-lg">
                Predicted ({prediction?.predicted_date}):{" "}
                <strong>{prediction?.predicted_close}</strong>
              </div>
            </div>

            {/* Chart */}
            <div className="overflow-x-auto">
              <div className="min-w-[300px]">
                <PredictedChart history={history} prediction={prediction} />
              </div>
            </div>

            {/* Notes */}
            <div className="mt-4 text-sm sm:text-md text-gray-600">
              <strong>Model notes:</strong> {prediction?.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
