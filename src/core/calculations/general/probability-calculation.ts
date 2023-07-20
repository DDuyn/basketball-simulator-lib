import { SETTINGS } from "../../../configuration/settings";
import { erf } from "./erf-calculation";

export const calculateProbability = (efficency: number): number => {
  const mean = efficency / 100;

  return Math.round(
    ((1 -
      erf(
        (0.5 - mean) / (Math.sqrt(2) * SETTINGS.GENERAL.STANDARD_DEVIATION)
      )) /
      2) *
      100
  );
};
