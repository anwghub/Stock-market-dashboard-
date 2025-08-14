import React from 'react';
import { useNavigate } from 'react-router-dom';
import botImage from "../assets/bot_image.png"

export default function BotButton({ symbol }) {
  const navigate = useNavigate();
  return (
    <button
    onClick={() => navigate(`/prediction/${encodeURIComponent(symbol || '')}`)}
      className="fixed bottom-16 right-16 w-28 h-28 rounded-full shadow-xl bg-white flex items-center justify-center "
      title="Open prediction bot"
    >
      <img src={botImage} alt="bot" className="w-12 h-12" />
    </button>
  );
}
