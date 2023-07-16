const MIN_DEFENDER_CAPACITY = 35;
const MAX_DEFENDER_CAPACITY = 66;

type Player = {
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
  const shootingAbility = calculateShootingAbility(attacker);
  const defenderCapacity = calculateDefenderCapacity();
  const defenseAbility = calculateDefenseAbility(defender, defenderCapacity);
  const effectiveShooting = calculateEffectiveShooting(
    shootingAbility,
    defenseAbility
  );

  const probability = calculateProbability(effectiveShooting);
  const slots = generateSlots(probability);
  const randomIndex = getRandomIndex(slots.length);
  shuffleArray(slots);
  const shoot = slots[randomIndex];

  const info = {
    name: attacker.name,
    statsShooting: shootingAbility,
    statsDefense: defenseAbility,
    defenderCapacity: defenderCapacity,
    stamina: attacker.stamina,
    probability: probability,
    random: randomIndex,
    shoot: shoot,
  };

  console.table(info);
};

const basketballSimulation = () => {
  console.log("Simulación iniciada");
  [...Array(10)].forEach(() => {
    simulateTwoPointsAttempt(players[0], players[1]);
    simulateTwoPointsAttempt(players[1], players[0]);
  });
};

const calculateShootingAbility = (player: Player): number => {
  return Math.floor(player.shootingTwoPoints * (player.stamina / 100));
};

const calculateDefenderCapacity = (): number => {
  return (
    Math.floor(
      Math.random() * (MAX_DEFENDER_CAPACITY - MIN_DEFENDER_CAPACITY + 1)
    ) + MIN_DEFENDER_CAPACITY
  );
};

const calculateDefenseAbility = (
  player: Player,
  defenderCapacity: number
): number => {
  return Math.floor(
    player.defenseTwoPoints * (player.stamina / 100) * (defenderCapacity / 100)
  );
};

const calculateEffectiveShooting = (
  shootingAbility: number,
  defenseAbility: number
): number => {
  return Math.floor(shootingAbility * (1 - defenseAbility / 100));
};

const calculateProbability = (effectiveShooting: number): number => {
  const mean = effectiveShooting / 100;
  const standardDeviation = 0.15;
  return Math.round(
    ((1 - erf((0.5 - mean) / (Math.sqrt(2) * standardDeviation))) / 2) * 100
  );
};

const generateSlots = (probability: number): string[] => {
  const slots: string[] = Array.from({ length: 100 }, (_, index) =>
    index < probability ? "Made" : "Fail"
  );
  return slots;
};

const getRandomIndex = (length: number): number => {
  return Math.floor(Math.random() * length);
};

const shuffleArray = (array: string[]) => {
  array.sort(() => Math.random() - 0.5);
};

const erf = (x: number): number => {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);

  const t = 1.0 / (1.0 + p * absX);
  const y = ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t;

  const erfValue = 1.0 - y * Math.exp(-absX * absX);

  return sign * erfValue;
};

const calculateAdjustedAbility = (
  baseAbility: number,
  stamina: number,
  adjustmentRange: number
): number => {
  const factor = stamina / 100;
  const adjustedAbility = baseAbility * factor * adjustmentRange;
  return Math.round(adjustedAbility);
};

basketballSimulation();
