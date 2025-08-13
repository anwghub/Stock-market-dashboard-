import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // set initial theme
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className="bg-base-200 p-5 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-bold">STOCKLY</Link>
          <Link to="/dashboard" className="hidden md:inline">Dashboard</Link>
          {/* <Link to="/about" className="hidden md:inline">About</Link> */}
        </div>
        <div className="flex gap-4 items-end">
          <button className="btn btn-lg btn-primary" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}
