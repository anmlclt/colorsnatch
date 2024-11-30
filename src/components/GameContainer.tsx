import React from 'react';
import { GameGrid } from './GameGrid';
import { BuyMeCoffeeButton } from './BuyMeCoffeeButton';

interface GameContainerProps {
  gameState: {
    gridSize: number;
    mainColor: string;
    differentColor: string;
    differentSquareIndex: number;
  };
  onSquareClick: (index: number) => void;
  highlightedArea: number[];
  wrongSquareIndex: number | null;
  level: number;
}

export const GameContainer: React.FC<GameContainerProps> = ({
  gameState,
  onSquareClick,
  highlightedArea,
  wrongSquareIndex,
  level,
}) => (
  <div className="w-full min-h-screen pt-48 md:pt-4 md:pl-32">
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="aspect-square w-[min(80vh,80vw)] md:w-[min(70vh,70vw)] relative">
        <GameGrid
          gridSize={gameState.gridSize}
          mainColor={gameState.mainColor}
          differentColor={gameState.differentColor}
          differentSquareIndex={gameState.differentSquareIndex}
          onSquareClick={onSquareClick}
          highlightedArea={highlightedArea}
          wrongSquareIndex={wrongSquareIndex}
        />
      </div>
      <div className="mt-16 md:mt-20">
        <BuyMeCoffeeButton />
      </div>
    </div>
  </div>
);