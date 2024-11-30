import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WrongAnswerEffectProps {
  index: number;
  gridSize: number;
}

export const WrongAnswerEffect: React.FC<WrongAnswerEffectProps> = ({ index, gridSize }) => {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  const squareSize = Math.min(85 / gridSize, 8);
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute"
          style={{
            top: `calc(50% - ${squareSize * (gridSize / 2 - row)}vh)`,
            left: `calc(50% - ${squareSize * (gridSize / 2 - col)}vh)`,
          }}
        />
      </div>
    </AnimatePresence>
  );
};