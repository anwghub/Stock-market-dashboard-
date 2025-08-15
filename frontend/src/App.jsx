import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import PredictionPage from "./pages/PredictionPage";

function App() {
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "coffee" : "cupcake"
    );
  }, []);
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prediction/:symbol" element={<PredictionPage />} /> 
      </Routes>
    </div>
  );
}

export default App;