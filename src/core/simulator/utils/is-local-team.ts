import { TeamType } from "../../../constants";

export const isLocalTeam = (team: TeamType): boolean => {
  return team === TeamType.LOCAL;
};
