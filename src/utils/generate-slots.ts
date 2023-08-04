import { SimulationResult } from "../constants/simulation-result";
import { randomizeList } from "./randomize-list";

export const generateProbabilityList = (probability: number): string[] => {
  const probabilityList: string[] = Array.from({ length: 100 }, (_, index) =>
    index < probability ? SimulationResult.SUCCESS : SimulationResult.FAILED
  );
  return randomizeList(probabilityList);
};
