import { generateProbabilityList, getRandomIndex } from "../../utils";
import {
  calculateEffectiveShooting,
  calculateProbability,
  standardDefenseTwoPointsShooting,
  standardShootingTwoPoints,
} from "../calculations";

export type Player = {
  name: string;
  shootingTwoPoints: number;
  defenseTwoPoints: number;
  stamina: number;
};

const players: Player[] = [
  {
    name: "Lebron James",
    shootingTwoPoints: 75,
    defenseTwoPoints: 40,
    stamina: 100,
  },
  {
    name: "Kevin Durant",
    shootingTwoPoints: 65,
    defenseTwoPoints: 60,
    stamina: 100,
  },
];

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
    name: attacker.name,
    statsShooting: shootingAbility,
    statsDefense: defenseAbility,
    stamina: attacker.stamina,
    probability: probability,
    shoot: shoot,
  };

  console.table(info);
};

export const basketballSimulation = () => {
  console.log("Simulación iniciada");
  [...Array(10)].forEach(() => {
    simulateTwoPointsAttempt(players[0], players[1]);
    simulateTwoPointsAttempt(players[1], players[0]);
  });
};
