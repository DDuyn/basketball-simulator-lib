import { TeamType } from "../../../constants";
import { GameState, Team } from "../../models";
import { extractPlayers, getRandomPlayer, isHomeTeam } from "../utils";

export const initializeGameState = (
  homeTeam: Team,
  awayTeam: Team
): GameState => {
  const startingTeam = Math.random() < 0.5 ? TeamType.HOME : TeamType.AWAY;
  const homeTeamInfo = {
    name: homeTeam.name,
    players: extractPlayers(homeTeam),
  };
  const awayTeamInfo = {
    name: awayTeam.name,
    players: extractPlayers(awayTeam),
  };

  const startingPlayers = isHomeTeam(startingTeam)
    ? homeTeamInfo.players
    : awayTeamInfo.players;

  return {
    info: {
      homeTeam: homeTeamInfo,
      awayTeam: awayTeamInfo,
    },
    timeRemainingSeconds: 720,
    playerStats: {},
    teamScores: {
      homeTeamScore: 0,
      awayTeamScore: 0,
    },
    ballPossession: {
      team: startingTeam,
      player: getRandomPlayer(startingPlayers),
    },
    events: [],
  };
};
