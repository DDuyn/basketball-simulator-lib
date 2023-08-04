import { SIMULATOR_OPTIONS } from "../../../configuration/simulator-options";
import { generateProbabilityList, getRandomIndex } from "../../../utils";
import {
  calculateEffectiveShooting,
  calculateProbability,
  standardDefenseTwoPointsShooting,
  standardShootingTwoPoints,
} from "../../calculations";
import { Player } from "../../models";

export const shortRangeAttempt = (
  attacker: Player,
  defender: Player
): string => {
  const shootingAbility = standardShootingTwoPoints(attacker);
  const defenseAbility = standardDefenseTwoPointsShooting(defender);
  const effectiveShooting = calculateEffectiveShooting(
    shootingAbility,
    defenseAbility
  );

  const probability = calculateProbability(effectiveShooting);
  const slots = generateProbabilityList(probability);
  const randomIndex = getRandomIndex(slots.length);
  const shoot = slots[randomIndex];

  if (SIMULATOR_OPTIONS.debugMode) {
    const info = {
      name: attacker.personalInfo.name,
      statsShooting: shootingAbility,
      statsDefense: defenseAbility,
      stamina: attacker.physicalSkill.stamina,
      probability: probability,
      shoot: shoot,
    };

    console.table(info);
  }

  return shoot;
};
