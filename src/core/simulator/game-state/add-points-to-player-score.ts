import { GameState } from "../../models";

export const addPointsToPlayerScore = (
  gameState: GameState,
  points: number
) => {
  const playerId = gameState.ballPossession.player.id;
  if (!gameState.playerStats[playerId]) {
    gameState.playerStats[playerId] = { points: 0 };
  }

  gameState.playerStats[playerId].points += points;
};
