import { TeamType } from "../../../constants";
import { GameState } from "../../models";

export const setTeamPossession = (gameState: GameState) => {
  const isLocalTeamPlayer = gameState.info.localTeam.players.includes(
    gameState.ballPossession.player
  );

  gameState.ballPossession.team = isLocalTeamPlayer
    ? TeamType.LOCAL
    : TeamType.AWAY;
};
