import React, { useEffect, useState } from "react";
import { getCompanies, getStockData } from "../service/stockServices";
import StockChart from "../components/StockChart";
import Sidebar from "../components/Sidebar";
import BotButton from "../components/BotButton";

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch company list on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
        if (data.length > 0) {
          setSelectedSymbol(data[0].symbol);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    })();
  }, []);

  // Fetch stock data when symbol changes
  useEffect(() => {
    if (!selectedSymbol) return;
    setLoading(true);
    (async () => {
      try {
        const data = await getStockData(selectedSymbol, "1mo", "1d");
        setStockData(data);
      } catch (err) {
        console.error("Error fetching stock data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedSymbol]);

  return (
    <div className="flex h-screen pt-[88px] bg-gradient-to-b from-blue-500 via-purple-500 to-purple-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-zinc-900 to-purple-1000 shadow-md overflow-y-auto">
        <Sidebar
          companies={companies}
          selectedSymbol={selectedSymbol}
          onSelect={setSelectedSymbol}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <h1 className="text-3xl font-bold mb-6">Stock Dashboard</h1>
        <div className="flex-1 bg-white p-4 rounded-lg shadow overflow-hidden pl-5 ml-20 pr-5 mr-28">
          {loading ? (
            <p>Loading chart...</p>
          ) : stockData ? (
            <StockChart stockData={stockData} />
          ) : (
            <p>No stock data available</p>
          )}
        </div>
      </div>

      {/* Bot Button */}
      {selectedSymbol && <BotButton symbol={selectedSymbol} />}
    </div>
  );
}
