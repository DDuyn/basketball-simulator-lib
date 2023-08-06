import { TeamType } from "../../../constants";

export const isHomeTeam = (team: TeamType): boolean => {
  return team === TeamType.HOME;
};
