import { GameState, Player } from "../../models";

export const setPlayerPossession = (gameState: GameState, player: Player) => {
  gameState.ballPossession.player = player;
};
