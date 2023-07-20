import { SETTINGS } from "../../../../../configuration";
import { Player } from "../../../../simulator";
import { calculateCapacity } from "../../../general";

export const standardDefenseTwoPointsShooting = (player: Player): number => {
  const defenseShootingTwoPointsRange =
    SETTINGS.DEFENSIVE.DEFENSE.RANGE_DEFENSE_SHOOTING_TWO_POINTS;

  const defenseCapacity = calculateCapacity(
    defenseShootingTwoPointsRange.MIN,
    defenseShootingTwoPointsRange.MAX
  );

  return Math.floor(
    player.defenseTwoPoints * (player.stamina / 100) * (defenseCapacity / 100)
  );
};
