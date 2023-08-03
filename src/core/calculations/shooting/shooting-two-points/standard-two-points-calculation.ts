import { SETTINGS } from "../../../../configuration";
import { Player } from "../../../models";
import { calculateCapacity } from "../../general";

//TODO: CAmbiar a MidRange, ShotRange y LargeRange
export const standardShootingTwoPoints = (player: Player) => {
  const shootingTwoPointsRange =
    SETTINGS.OFFENSIVE.SHOOTING.RANGE_SHOOTING_TWO_POINT;

  const capacity = calculateCapacity(
    shootingTwoPointsRange.MIN,
    shootingTwoPointsRange.MAX
  );

  return Math.floor(
    player.offensiveSkill.outsideSkill.shortRangeShot *
      (capacity / 100) *
      (player.physicalSkill.stamina / 100)
  );
};
