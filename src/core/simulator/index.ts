import { DATA } from "../../../data/data-simulator";
import { generateProbabilityList, getRandomIndex } from "../../utils";
import {
  calculateEffectiveShooting,
  calculateProbability,
  standardDefenseTwoPointsShooting,
  standardShootingTwoPoints,
} from "../calculations";
import { Player } from "../models";

const simulateTwoPointsAttempt = (attacker: Player, defender: Player) => {
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

  const info = {
    name: attacker.personalInfo.name,
    statsShooting: shootingAbility,
    statsDefense: defenseAbility,
    stamina: attacker.physicalSkill.stamina,
    probability: probability,
    shoot: shoot,
  };

  console.table(info);
};

export const basketballSimulation = () => {
  console.log("Simulación iniciada");
  [...Array(10)].forEach(() => {
    simulateTwoPointsAttempt(
      DATA.teams[0].players[0],
      DATA.teams[1].players[0]
    );
    simulateTwoPointsAttempt(
      DATA.teams[1].players[1],
      DATA.teams[0].players[1]
    );
  });
};
