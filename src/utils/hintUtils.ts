export const calculateHintArea = (
  gridSize: number,
  correctIndex: number
): number[] => {
  const totalSquares = gridSize * gridSize;
  const areaSize = Math.floor(totalSquares / 4);
  
  // Calculate the center of the hint area
  const row = Math.floor(correctIndex / gridSize);
  const col = correctIndex % gridSize;
  
  // Calculate the area bounds
  const radius = Math.floor(Math.sqrt(areaSize) / 2);
  const indices: number[] = [];
  
  for (let r = Math.max(0, row - radius); r <= Math.min(gridSize - 1, row + radius); r++) {
    for (let c = Math.max(0, col - radius); c <= Math.min(gridSize - 1, col + radius); c++) {
      indices.push(r * gridSize + c);
    }
  }
  
  return indices;
};