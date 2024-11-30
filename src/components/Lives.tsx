import React from 'react';
import { Heart, HeartOff } from 'lucide-react';

interface LivesProps {
  lives: number;
  maxLives: number;
}

export const Lives: React.FC<LivesProps> = ({ lives, maxLives }) => (
  <div className="flex items-center justify-center gap-1.5 
                  bg-white/5 backdrop-blur-md rounded-xl p-2
                  border border-white/5">
    {Array.from({ length: maxLives }).map((_, index) => (
      index < lives ? (
        <Heart 
          key={index} 
          className="w-4 h-4 text-red-500 transition-all duration-300" 
          fill="currentColor"
        />
      ) : (
        <HeartOff 
          key={index} 
          className="w-4 h-4 text-gray-500/50 transition-all duration-300" 
        />
      )
    ))}
  </div>
);