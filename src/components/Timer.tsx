import React from 'react';

interface TimerProps {
  time: number;
}

export const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <span className="text-lg font-light">
      {formatTime(time)}
    </span>
  );
};