import React, { useEffect, useState } from "react";
import { getCompanies, getStockData } from "../service/stockServices";
import StockChart from "../components/StockChart";
import Sidebar from "../components/Sidebar";
import BotButton from '../components/BotButton';

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
                    setSelectedSymbol(data[0].symbol); // auto select first company
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
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <Sidebar
                    companies={companies}
                    selectedSymbol={selectedSymbol}
                    onSelect={setSelectedSymbol}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-4">Stock Dashboard</h1>
                <div className="bg-white p-4 rounded-lg shadow">
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
