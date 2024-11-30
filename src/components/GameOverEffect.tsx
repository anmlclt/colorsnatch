import React from 'react';
import { motion } from 'framer-motion';

const Teardrop: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ 
      y: ['0%', '100%'],
      opacity: [0, 1, 0]
    }}
    transition={{
      duration: 2,
      delay,
      ease: 'easeIn',
    }}
    className="absolute w-2 h-4 bg-blue-400/50 rounded-full blur-sm"
    style={{
      left: `${Math.random() * 100}%`,
    }}
  />
);

export const GameOverEffect: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-blue-500/10"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <Teardrop key={i} delay={i * 0.1} />
      ))}
    </motion.div>
  </div>
);