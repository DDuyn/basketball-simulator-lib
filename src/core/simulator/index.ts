import { getRandomIndex } from "../../utils";
import { Player, Team } from "../models";
import { shortRangeAttempt } from "./offensive/short-range-attempt";

const getRandomPlayer = (players: Player[]) => {
  const index = getRandomIndex(players.length);
  return players[index];
};

const extractPlayers = (team: Team) => {
  return [...team.players];
};

export const basketballSimulation = (localTeam: Team, awayTeam: Team) => {
  const localPlayers = extractPlayers(localTeam);
  const awayPlayers = extractPlayers(awayTeam);

  [...Array(10)].forEach(() => {
    shortRangeAttempt(
      getRandomPlayer(localPlayers),
      getRandomPlayer(awayPlayers)
    );

    shortRangeAttempt(
      getRandomPlayer(awayPlayers),
      getRandomPlayer(localPlayers)
    );
  });
};
