import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const getCompanies = async () => {
  const res = await axios.get(`${BACKEND}/companies`);
  return res.data;
};

export const getStockData = async (symbol, period = "6mo", interval = "1d") => {
  const res = await axios.get(`${BACKEND}/stocks/${encodeURIComponent(symbol)}?period=${period}&interval=${interval}`);
  return res.data; // { symbol, data: [...] }
};

export const getPrediction = async (symbol) => {
  const res = await axios.get(`${BACKEND}/predict/${encodeURIComponent(symbol)}`);
  return res.data;
};
