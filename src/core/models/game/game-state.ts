import { TeamType } from "../../../constants";
import { Player } from "../player";
import { PlayerStats } from "./player-stats";

type TeamScores = {
  localTeamScore: number;
  awayTeamScore: number;
};

export interface GameState {
  info: {
    localTeam: { name: string; players: Player[] };
    awayTeam: { name: string; players: Player[] };
  };
  timeRemainingSeconds: number;
  teamScores: TeamScores;
  playerStats: { [playerId: number]: PlayerStats };
  ballPossession: {
    team: TeamType;
    player: Player;
  };
  events: string[];
}