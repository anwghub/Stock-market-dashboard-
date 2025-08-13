import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import PredictionPage from "./pages/PredictionPage";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prediction/:symbol" element={<PredictionPage />} /> 
        {/* Add /about, 404 etc. as needed */}
      </Routes>
    </div>
  );
}

export default App;
