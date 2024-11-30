import React, { ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface StatItemProps {
  icon: ReactNode;
  value: string;
  highlight?: boolean;
}

export const StatItem: React.FC<StatItemProps> = ({ icon, value, highlight = false }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (highlight) {
      controls.start({
        backgroundColor: ['rgba(30, 58, 138, 0.3)', 'rgba(234, 179, 8, 0.3)', 'rgba(30, 58, 138, 0.3)'],
        transition: {
          duration: 1,
          repeat: 2,
          ease: "easeInOut"
        }
      });
    }
  }, [highlight, controls]);

  return (
    <motion.div 
      animate={controls}
      className="flex-1 flex items-center justify-center gap-2 
                bg-blue-900/30 backdrop-blur-md rounded-xl p-2
                border border-blue-800/30 shadow-lg"
    >
      {icon}
      <span className="text-sm font-light text-white/90">{value}</span>
    </motion.div>
  );
};