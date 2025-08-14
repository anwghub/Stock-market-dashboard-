import React from "react";
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-purple-900 text-white flex items-center justify-center">
      <div className="max-w-4xl w-full p-12 rounded-xl bg-gradient-to-b from-purple-700 via-purple-400 to-blue-400 shadow-xl">
        <h1 className="text-5xl font-bold text-center mb-6 text-purple-200">StockFlow</h1>
        <p className="text-center mb-8">Get the details for your everyday stock market</p>
        <div className="flex justify-center">
          <button
            onClick={() => nav('/dashboard')}
            className="btn btn-primary btn-lg px-8 bg-zinc-800"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
