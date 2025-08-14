import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StockFlow from "../assets/StockFlow_logo.png";

export default function Header() {
  const [theme, setTheme] = useState("cupcake");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-purple-950 p-5 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left side - Logo + StockFlow */}
        <div className="flex items-center gap-3">
          <img src={StockFlow} alt="main_logo" className="size-12" />
          <Link to="/" className="text-3xl font-bold">
            StockFlow
          </Link>
        </div>

        {/* Right side - Dashboard link */}
        <div>
          <Link to="/dashboard" className="text-lg font-medium">
            Dashboard
          </Link>
        </div>

      </div>
    </header>
  );
}
