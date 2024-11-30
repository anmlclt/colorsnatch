import React from 'react';
import { Lightbulb } from 'lucide-react';

interface HintButtonProps {
  onHintClick: () => void;
  isAvailable: boolean;
  nextAvailableLevel: number;
  currentLevel: number;
}

export const HintButton: React.FC<HintButtonProps> = ({
  onHintClick,
  isAvailable,
}) => (
  <button
    onClick={onHintClick}
    disabled={!isAvailable}
    className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl 
               font-medium transition-all duration-200
               border border-white/5
      ${isAvailable 
        ? 'bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20 border-yellow-500/20' 
        : 'bg-white/5 text-gray-400 cursor-not-allowed'}`}
  >
    <Lightbulb className={`w-5 h-5 ${isAvailable ? 'text-yellow-300' : 'text-gray-500/50'}`} />
    <span className="md:hidden">HINT</span>
  </button>
);