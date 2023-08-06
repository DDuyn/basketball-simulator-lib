import { GameState } from "../../models";
import { isHomeTeam } from "../utils";

export const addPointsToTeamScore = (gameState: GameState, points: number) => {
  isHomeTeam(gameState.ballPossession.team)
    ? (gameState.teamScores.homeTeamScore += points)
    : (gameState.teamScores.awayTeamScore += points);
};
