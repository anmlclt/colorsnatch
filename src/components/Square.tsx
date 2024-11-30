import React from 'react';
import { motion } from 'framer-motion';

interface SquareProps {
  color: string;
  onClick: () => void;
  isHighlighted?: boolean;
  isWrong?: boolean;
}

export const Square: React.FC<SquareProps> = ({ color, onClick, isHighlighted, isWrong }) => (
  <motion.button
    onClick={onClick}
    animate={{
      backgroundColor: isWrong ? ['#ef4444', color, '#ef4444', color] : color,
    }}
    transition={{
      duration: isWrong ? 0.6 : 0.2,
      times: isWrong ? [0, 0.3, 0.6, 1] : [0, 1],
      ease: "easeInOut"
    }}
    className={`w-full aspect-square transition-transform duration-200 
                hover:scale-[0.97] active:scale-95 rounded-xl relative
                shadow-lg border-2 border-white/10
                ${isHighlighted ? 'ring-2 ring-white/30 ring-offset-2 ring-offset-transparent' : ''}`}
    style={{
      backgroundColor: color,
    }}
  />
);