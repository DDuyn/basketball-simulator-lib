export const calculateCapacity = (min: number, max: number): number => {
  min *= 100;
  max *= 100;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
