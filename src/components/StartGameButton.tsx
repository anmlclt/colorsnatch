import React from 'react';
import { Play } from 'lucide-react';

interface StartGameButtonProps {
  onClick: () => void;
}

export const StartGameButton: React.FC<StartGameButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="h-14 flex items-center justify-center gap-3 px-6 rounded-xl 
               font-medium transition-all duration-200 
               bg-white/5 hover:bg-white/10 text-white
               border border-white/5 hover:border-white/10"
  >
    <Play className="w-5 h-5" />
    Start New Game
  </button>
);