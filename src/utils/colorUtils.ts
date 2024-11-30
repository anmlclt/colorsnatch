export const generateShades = (level: number): { mainColor: string; differentColor: string } => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 50;
  
  // Difference gets smaller as level increases
  const difference = Math.max(1.5, Math.floor(30 / Math.sqrt(level)));
  
  return {
    mainColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    differentColor: `hsl(${hue}, ${saturation}%, ${lightness + difference}%)`
  };
};

export const calculateGridSize = (level: number): number => {
  // Calculate the "effective level" by dividing the actual level by 5 and rounding up
  // This means the grid size will only increase every 5 levels
  const effectiveLevel = Math.ceil(level / 5);
  
  // Starting from 2x2, going up to 20x20
  // Using the effective level for calculation
  return Math.min(Math.floor(Math.sqrt(effectiveLevel * 6) + 2), 20);
};