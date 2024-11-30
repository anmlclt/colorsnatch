import React from 'react';
import { Square } from './Square';

interface GameGridProps {
  gridSize: number;
  mainColor: string;
  differentColor: string;
  differentSquareIndex: number;
  onSquareClick: (index: number) => void;
  highlightedArea: number[];
  wrongSquareIndex: number | null;
}

export const GameGrid: React.FC<GameGridProps> = ({
  gridSize,
  mainColor,
  differentColor,
  differentSquareIndex,
  onSquareClick,
  highlightedArea,
  wrongSquareIndex,
}) => {
  return (
    <div 
      className="grid gap-1.5 p-4 sm:p-6 bg-black/20 backdrop-blur-sm rounded-3xl shadow-2xl h-full"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, index) => (
        <Square
          key={index}
          color={index === differentSquareIndex ? differentColor : mainColor}
          onClick={() => onSquareClick(index)}
          isHighlighted={highlightedArea.includes(index)}
          isWrong={index === wrongSquareIndex}
        />
      ))}
    </div>
  );
};