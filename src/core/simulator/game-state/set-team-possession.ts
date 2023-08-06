import { TeamType } from "../../../constants";
import { GameState } from "../../models";

export const setTeamPossession = (gameState: GameState) => {
  const isHomeTeamPlayer = gameState.info.homeTeam.players.includes(
    gameState.ballPossession.player
  );

  gameState.ballPossession.team = isHomeTeamPlayer
    ? TeamType.HOME
    : TeamType.AWAY;
};
