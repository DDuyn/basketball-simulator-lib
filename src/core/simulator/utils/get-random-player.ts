import { getRandomIndex } from "../../../utils";
import { Player } from "../../models";

export const getRandomPlayer = (players: Player[]) => {
  const index = getRandomIndex(players.length);
  return players[index];
};
