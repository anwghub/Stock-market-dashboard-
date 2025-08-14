import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StockFlow from "../assets/StockFlow_logo.png";

export default function Header() {
  const [theme, setTheme] = useState("cupcake");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-base-200 p-5 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left side - Logo + StockFlow */}
        <div className="flex items-center gap-3">
          <img src={StockFlow} alt="main_logo" className="size-10 sm:size-12" />
          <Link to="/" className="text-2xl sm:text-3xl font-bold">
            StockFlow
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-base-200 shadow rounded-lg p-4">
          <Link
            to="/dashboard"
            className="block py-2 px-3 text-lg font-medium hover:bg-base-300 rounded"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
