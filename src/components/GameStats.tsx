import React from 'react';
import { Trophy, Target, Clock } from 'lucide-react';
import { StatItem } from './StatItem';

interface GameStatsProps {
  level: number;
  score: number;
  time: number;
  highlightLevel?: boolean;
}

export const GameStats: React.FC<GameStatsProps> = ({ 
  level, 
  score, 
  time,
  highlightLevel = false 
}) => {
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-1 items-center gap-2">
      <StatItem
        icon={<Target className="w-4 h-4 text-blue-400" />}
        value={level.toString()}
        highlight={highlightLevel}
      />
      <StatItem
        icon={<Trophy className="w-4 h-4 text-yellow-400" />}
        value={score.toString()}
      />
      <StatItem
        icon={<Clock className="w-4 h-4 text-green-400" />}
        value={formatTime(time)}
      />
    </div>
  );
};