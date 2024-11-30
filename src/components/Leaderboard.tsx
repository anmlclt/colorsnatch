import React from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, Clock, Target, Loader2 } from 'lucide-react';
import { GameScore } from '../types/game';
import { formatTime } from '../utils/timeUtils';
import { Pagination } from './Pagination';

interface LeaderboardProps {
  show: boolean;
  scores: GameScore[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onClose: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  show,
  scores,
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
  onClose,
}) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-white/10"
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-semibold text-white">Leaderboard</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-800/50 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-white/70">
                  <th className="p-2 md:p-4 text-left text-sm">Rank</th>
                  <th className="p-2 md:p-4 text-left text-sm">Player</th>
                  <th className="p-2 md:p-4 text-left">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="hidden md:inline text-sm">Score</span>
                    </div>
                  </th>
                  <th className="p-2 md:p-4 text-left">
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="hidden md:inline text-sm">Level</span>
                    </div>
                  </th>
                  <th className="p-2 md:p-4 text-left">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="hidden md:inline text-sm">Time</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center">
                      <div className="flex items-center justify-center gap-2 text-white/70">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Loading scores...</span>
                      </div>
                    </td>
                  </tr>
                ) : scores.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-white/50">
                      No scores yet. Be the first to play!
                    </td>
                  </tr>
                ) : (
                  scores.map((score, index) => (
                    <tr 
                      key={index}
                      className="border-b border-white/5 text-white/90 hover:bg-gray-800/30 transition-colors duration-200"
                    >
                      <td className="p-2 md:p-4 text-sm">
                        {(currentPage - 1) * 10 + index + 1}
                      </td>
                      <td className="p-2 md:p-4 text-sm">{score.name}</td>
                      <td className="p-2 md:p-4 text-sm">{score.score}</td>
                      <td className="p-2 md:p-4 text-sm">{score.level}</td>
                      <td className="p-2 md:p-4 text-sm">{formatTime(score.time)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};