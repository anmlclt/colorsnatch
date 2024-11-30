import { supabase } from '../lib/supabase';
import type { GameScore } from '../types/game';

const ITEMS_PER_PAGE = 10;

export const leaderboardService = {
  async getScores(page: number = 1): Promise<{
    scores: GameScore[];
    totalCount: number;
  }> {
    try {
      // Get total count
      const { count: totalCount } = await supabase
        .from('leaderboard')
        .select('*', { count: 'exact', head: true });

      // Get paginated scores
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (error) throw error;

      return {
        scores: (data || []).map(score => ({
          name: score.name,
          score: score.score,
          level: score.level,
          time: score.time,
          date: score.created_at
        })),
        totalCount: totalCount || 0
      };
    } catch (error) {
      console.error('Error fetching scores:', error);
      return { scores: [], totalCount: 0 };
    }
  },

  async saveScore(score: Omit<GameScore, 'date'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert([{
          name: score.name,
          score: score.score,
          level: score.level,
          time: score.time
        }]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving score:', error);
      return false;
    }
  }
};