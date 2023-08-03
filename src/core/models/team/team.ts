import { Player } from "../player/player";

export interface Team {
  id: number;
  name: string;
  players: Player[];
}
