import { TeamType } from "../../../constants";
import { GameState, Team } from "../../models";
import { extractPlayers, getRandomPlayer, isLocalTeam } from "../utils";

export const initializeGameState = (
  localTeam: Team,
  awayTeam: Team
): GameState => {
  const startingTeam = Math.random() < 0.5 ? TeamType.LOCAL : TeamType.AWAY;
  const localTeamInfo = {
    name: localTeam.name,
    players: extractPlayers(localTeam),
  };
  const awayTeamInfo = {
    name: awayTeam.name,
    players: extractPlayers(awayTeam),
  };

  const startingPlayers = isLocalTeam(startingTeam)
    ? localTeamInfo.players
    : awayTeamInfo.players;

  return {
    info: {
      localTeam: localTeamInfo,
      awayTeam: awayTeamInfo,
    },
    timeRemainingSeconds: 720,
    playerStats: {},
    teamScores: {
      localTeamScore: 0,
      awayTeamScore: 0,
    },
    ballPossession: {
      team: startingTeam,
      player: getRandomPlayer(startingPlayers),
    },
    events: [],
  };
};
