import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BotButton({ symbol }) {
  const navigate = useNavigate();
  return (
    <button
    onClick={() => navigate(`/prediction/${encodeURIComponent(symbol || '')}`)}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg bg-white flex items-center justify-center"
      title="Open prediction bot"
    >
      <img src="/robot-icon.png" alt="bot" className="w-10 h-10" />
    </button>
  );
}
