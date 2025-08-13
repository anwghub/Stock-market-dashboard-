import React from "react";

export default function Sidebar({ companies = [], selectedSymbol, onSelect }) {
  return (
    <div className="p-6 h-[calc(100vh-64px)] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Companies</h2>
      <ul className="space-y-3">
        {companies.map((c) => (
          <li key={c.symbol}>
            <button
              onClick={() => onSelect(c.symbol)}
              className={`w-full text-left px-3 py-3 rounded-md transition-colors duration-150 flex items-center justify-between ${
                selectedSymbol === c.symbol ? 'bg-primary text-cyan' : 'bg-transparent hover:bg-base-100'
              }`}
            >
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs opacity-80">{c.symbol}</div>
              </div>
              <div className="text-xs opacity-70">›</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
