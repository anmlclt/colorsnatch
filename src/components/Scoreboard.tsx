import React from 'react';
import { Trophy, Clock, Target } from 'lucide-react';
import { GameScore } from '../types/game';
import { formatTime } from '../utils/timeUtils';

interface ScoreboardProps {
  scores: GameScore[];
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ scores }) => (
  <div className="w-full max-h-[300px] overflow-y-auto">
    <table className="w-full">
      <thead className="sticky top-0 bg-white/5">
        <tr className="text-left">
          <th className="p-3">Rank</th>
          <th className="p-3">Name</th>
          <th className="p-3"><Trophy className="w-4 h-4" /></th>
          <th className="p-3"><Target className="w-4 h-4" /></th>
          <th className="p-3"><Clock className="w-4 h-4" /></th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr 
            key={index}
            className="border-t border-white/5 text-white/90"
          >
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{score.name}</td>
            <td className="p-3">{score.score}</td>
            <td className="p-3">{score.level}</td>
            <td className="p-3">{formatTime(score.time)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);