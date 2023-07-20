export const randomizeList = (list: string[]): string[] => {
  return list.sort(() => Math.random() - 0.5);
};
