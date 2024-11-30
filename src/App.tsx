import React, { useState, useCallback, useEffect } from 'react';
import { GameHeader } from './components/GameHeader';
import { GameContainer } from './components/GameContainer';
import { GameOverModal } from './components/GameOverModal';
import { GameOverEffect } from './components/GameOverEffect';
import { Leaderboard } from './components/Leaderboard';
import { generateShades, calculateGridSize } from './utils/colorUtils';
import { calculateHintArea } from './utils/hintUtils';
import { GameState, GameScore, HintState } from './types/game';
import { useLeaderboard } from './hooks/useLeaderboard';

const MAX_LIVES = 3;
const HINT_LEVEL_INTERVAL = 10;

function App() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showGameOverEffect, setShowGameOverEffect] = useState(false);
  const [wrongSquareIndex, setWrongSquareIndex] = useState<number | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [hint, setHint] = useState<HintState>({
    isActive: false,
    availableAt: HINT_LEVEL_INTERVAL,
    highlightedArea: [],
  });
  
  const [gameState, setGameState] = useState<GameState>(() => {
    const gridSize = calculateGridSize(1);
    const { mainColor, differentColor } = generateShades(1);
    return {
      gridSize,
      mainColor,
      differentColor,
      differentSquareIndex: Math.floor(Math.random() * (gridSize * gridSize))
    };
  });

  const { 
    scores, 
    isLoading, 
    currentPage, 
    totalPages, 
    saveScore, 
    goToPage 
  } = useLeaderboard();

  useEffect(() => {
    let timer: number;
    if (isGameActive) {
      timer = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  useEffect(() => {
    if (wrongSquareIndex !== null) {
      const timer = setTimeout(() => {
        setWrongSquareIndex(null);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [wrongSquareIndex]);

  const handleGameOver = useCallback(() => {
    setIsGameActive(false);
    setShowGameOver(true);
    setShowGameOverEffect(true);
  }, []);

  const handleSaveScore = useCallback((name: string) => {
    saveScore({
      name,
      score,
      level,
      time,
    });
  }, [score, level, time, saveScore]);

  const handleRestart = useCallback(() => {
    setLevel(1);
    setScore(0);
    setTime(0);
    setLives(MAX_LIVES);
    setShowGameOver(false);
    setShowGameOverEffect(false);
    setIsGameActive(true);
    setHint({
      isActive: false,
      availableAt: HINT_LEVEL_INTERVAL,
      highlightedArea: [],
    });
    const gridSize = calculateGridSize(1);
    const { mainColor, differentColor } = generateShades(1);
    setGameState({
      gridSize,
      mainColor,
      differentColor,
      differentSquareIndex: Math.floor(Math.random() * (gridSize * gridSize))
    });
  }, []);

  const handleHint = useCallback(() => {
    if (level >= hint.availableAt) {
      const hintArea = calculateHintArea(
        gameState.gridSize,
        gameState.differentSquareIndex
      );
      setHint(prev => ({
        ...prev,
        isActive: true,
        availableAt: level + HINT_LEVEL_INTERVAL,
        highlightedArea: hintArea,
      }));
    }
  }, [level, hint.availableAt, gameState]);

  const handleSquareClick = useCallback((index: number) => {
    if (!isGameActive) {
      setIsGameActive(true);
    }

    if (index === gameState.differentSquareIndex) {
      const newLevel = level + 1;
      const gridSize = calculateGridSize(newLevel);
      const { mainColor, differentColor } = generateShades(newLevel);
      
      setLevel(newLevel);
      setScore(score + Math.floor(100 * Math.sqrt(level)));
      setGameState({
        gridSize,
        mainColor,
        differentColor,
        differentSquareIndex: Math.floor(Math.random() * (gridSize * gridSize))
      });
      setHint(prev => ({
        ...prev,
        isActive: false,
        highlightedArea: [],
      }));
    } else {
      setWrongSquareIndex(index);
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        handleGameOver();
      }
    }
  }, [level, score, gameState, lives, handleGameOver, isGameActive]);

  const handleCloseGameOver = useCallback(() => {
    setShowGameOver(false);
    setIsGameActive(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 relative overflow-hidden">
      <GameHeader
        isGameActive={isGameActive}
        showGameOver={showGameOver}
        level={level}
        score={score}
        time={time}
        lives={lives}
        maxLives={MAX_LIVES}
        hint={hint}
        onHintClick={handleHint}
        onShowLeaderboard={() => setShowLeaderboard(true)}
      />
      
      <GameContainer
        gameState={gameState}
        onSquareClick={handleSquareClick}
        highlightedArea={hint.isActive ? hint.highlightedArea : []}
        wrongSquareIndex={wrongSquareIndex}
        level={level}
      />

      {showGameOverEffect && <GameOverEffect />}
      <GameOverModal
        show={showGameOver}
        score={score}
        level={level}
        time={time}
        onRestart={handleRestart}
        onSaveScore={handleSaveScore}
        scores={scores}
        onClose={handleCloseGameOver}
      />
      <Leaderboard
        show={showLeaderboard}
        scores={scores}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={goToPage}
        onClose={() => setShowLeaderboard(false)}
      />
    </div>
  );
}

export default App;