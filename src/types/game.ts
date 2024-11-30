export interface GameScore {
  name: string;
  score: number;
  level: number;
  time: number;
  date: string;
}

export interface GameState {
  gridSize: number;
  mainColor: string;
  differentColor: string;
  differentSquareIndex: number;
}

export interface HintState {
  isActive: boolean;
  availableAt: number;
  highlightedArea: number[];
}