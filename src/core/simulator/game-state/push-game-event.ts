import { GameState } from "../../models";

export const pushGameEvent = (gameState: GameState, event: string) => {
  gameState.events.push(event);
};
