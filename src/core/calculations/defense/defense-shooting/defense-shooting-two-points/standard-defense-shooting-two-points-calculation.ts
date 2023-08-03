import { SETTINGS } from "../../../../../configuration";
import { Player } from "../../../../models";
import { calculateCapacity } from "../../../general";

//TODO: Adaptar al nuevo modelo
export const standardDefenseTwoPointsShooting = (player: Player): number => {
  const defenseShootingTwoPointsRange =
    SETTINGS.DEFENSIVE.DEFENSE.RANGE_DEFENSE_SHOOTING_TWO_POINTS;

  const defenseCapacity = calculateCapacity(
    defenseShootingTwoPointsRange.MIN,
    defenseShootingTwoPointsRange.MAX
  );

  return Math.floor(
    player.defensiveSkill.interiorDefense *
      (player.physicalSkill.stamina / 100) *
      (defenseCapacity / 100)
  );
};
