import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-sky-500 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">Stock Market Dashboard</h1>
        <div className="text-sm opacity-90">React + Tailwind + FastAPI</div>
      </div>
    </header>
  );
}
