import { Team } from "../../models";

export const extractPlayers = (team: Team) => {
  return [...team.players];
};
