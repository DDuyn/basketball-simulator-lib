import { GameState } from "../../models";
import { isLocalTeam } from "../utils";

export const addPointsToScore = (gameState: GameState, points: number) => {
  isLocalTeam(gameState.ballPossession.team)
    ? (gameState.teamScores.localTeamScore += points)
    : (gameState.teamScores.awayTeamScore += points);
};
