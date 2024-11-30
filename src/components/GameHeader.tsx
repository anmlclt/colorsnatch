import React from 'react';
import { HintButton } from './HintButton';
import { Lives } from './Lives';
import { GameStats } from './GameStats';
import { Trophy, Target, Clock } from 'lucide-react';
import { StatItem } from './StatItem';
import { formatTime } from '../utils/timeUtils';
import { Logo } from './Logo';

interface GameHeaderProps {
  isGameActive: boolean;
  showGameOver: boolean;
  level: number;
  score: number;
  time: number;
  lives: number;
  maxLives: number;
  hint: {
    availableAt: number;
    isActive: boolean;
  };
  onHintClick: () => void;
  onShowLeaderboard: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  level,
  score,
  time,
  lives,
  maxLives,
  hint,
  onHintClick,
  onShowLeaderboard,
}) => {
  const shouldHighlightLevel = level > 0 && level % 10 === 0;

  return (
    <div className="fixed top-0 left-0 z-50 
                    w-full md:w-28 h-auto md:h-screen 
                    bg-blue-950/80 backdrop-blur-md border-b md:border-r border-blue-800/50
                    shadow-lg shadow-black/20">
      {/* Mobile Layout */}
      <div className="md:hidden w-full flex flex-col items-center p-4 gap-3">
        <Logo className="h-10 text-white/90" />
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={onShowLeaderboard}
            className="flex items-center justify-center gap-2 p-2 rounded-xl
                     bg-blue-900/50 hover:bg-blue-800/50 text-white/90
                     border border-blue-700/50 transition-colors duration-200"
          >
            <Trophy className="w-5 h-5 text-yellow-400" />
          </button>
          <HintButton
            onHintClick={onHintClick}
            isAvailable={level >= hint.availableAt}
            nextAvailableLevel={hint.availableAt}
            currentLevel={level}
          />
          <Lives lives={lives} maxLives={maxLives} />
        </div>
        <div className="flex items-center gap-2 w-full">
          <GameStats 
            level={level} 
            score={score} 
            time={time}
            highlightLevel={shouldHighlightLevel}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-col h-full p-4 gap-4">
        <Logo className="w-20 text-white/90 mb-4" />
        
        <button
          onClick={onShowLeaderboard}
          className="flex flex-col items-center gap-2 p-3 rounded-xl
                   bg-blue-900/50 hover:bg-blue-800/50 text-white/90
                   border border-blue-700/50 transition-colors duration-200"
        >
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-xs font-light">Leaderboard</span>
        </button>

        <div className="flex flex-col gap-2">
          <HintButton
            onHintClick={onHintClick}
            isAvailable={level >= hint.availableAt}
            nextAvailableLevel={hint.availableAt}
            currentLevel={level}
          />
          <span className="text-xs text-center text-white/50">
            {level >= hint.availableAt ? 'Need help?' : `Next hint at ${hint.availableAt}`}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Lives lives={lives} maxLives={maxLives} />
          <span className="text-xs text-center text-white/50">Lives</span>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <StatItem
              icon={<Target className="w-4 h-4 text-blue-400" />}
              value={level.toString()}
              highlight={shouldHighlightLevel}
            />
            <span className="text-xs text-center text-white/50">Level</span>
          </div>

          <div className="flex flex-col gap-2">
            <StatItem
              icon={<Trophy className="w-4 h-4 text-yellow-400" />}
              value={score.toString()}
            />
            <span className="text-xs text-center text-white/50">Score</span>
          </div>

          <div className="flex flex-col gap-2">
            <StatItem
              icon={<Clock className="w-4 h-4 text-green-400" />}
              value={formatTime(time)}
            />
            <span className="text-xs text-center text-white/50">Time</span>
          </div>
        </div>
      </div>
    </div>
  );
};