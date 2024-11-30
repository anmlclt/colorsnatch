import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationMessageProps {
  level: number;
  show: boolean;
}

export const CelebrationMessage: React.FC<CelebrationMessageProps> = ({ level, show }) => (
  <AnimatePresence>
    {show && (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20
                     shadow-xl"
        >
          <div className="text-white text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-bold mb-2"
            >
              Level {level}!
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80"
            >
              Great progress!
            </motion.div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);