import { SETTINGS } from "../../../../configuration";
import { Player } from "../../../simulator";
import { calculateCapacity } from "../../general";

export const standardShootingTwoPoints = (player: Player) => {
  const shootingTwoPointsRange =
    SETTINGS.OFFENSIVE.SHOOTING.RANGE_SHOOTING_TWO_POINT;

  const capacity = calculateCapacity(
    shootingTwoPointsRange.MIN,
    shootingTwoPointsRange.MAX
  );

  return Math.floor(
    player.shootingTwoPoints * (capacity / 100) * (player.stamina / 100)
  );
};
