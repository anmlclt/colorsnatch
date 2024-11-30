import { useState, useEffect, useCallback } from 'react';
import { GameScore } from '../types/game';
import { leaderboardService } from '../services/leaderboardService';

export const useLeaderboard = () => {
  const [scores, setScores] = useState<GameScore[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchScores = useCallback(async (page: number = currentPage) => {
    setIsLoading(true);
    try {
      const { scores: fetchedScores, totalCount } = await leaderboardService.getScores(page);
      setScores(fetchedScores);
      setTotalPages(Math.ceil(totalCount / 10));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching scores:', error);
      setScores([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const saveScore = async (score: Omit<GameScore, 'date'>) => {
    try {
      const success = await leaderboardService.saveScore(score);
      if (success) {
        await fetchScores(1); // Refresh scores and go to first page
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  return {
    scores,
    isLoading,
    currentPage,
    totalPages,
    saveScore,
    refreshScores: fetchScores,
    goToPage: (page: number) => fetchScores(page)
  };
};