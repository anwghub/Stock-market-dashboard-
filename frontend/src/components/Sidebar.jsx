import React from 'react';

export default function Sidebar({ companies = [], selectedSymbol, onSelect }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Companies</h2>
      <div className="overflow-y-auto h-[calc(100vh-100px)]">
        <ul className="space-y-2">
          {companies.length === 0 && (
            <li className="text-sm text-gray-500">No companies found</li>
          )}

          {companies.map(c => (
            <li key={c.symbol}>
              <button
                onClick={() => onSelect(c.symbol)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-150 flex items-center justify-between ${
                  selectedSymbol === c.symbol
                    ? 'bg-indigo-50 border-l-4 border-indigo-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-gray-400">{c.symbol}</div>
                </div>
                <div className="text-xs text-gray-500">›</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
