import { SETTINGS } from "../../../../configuration/settings";

export const calculateEffectiveShooting = (
  shootingAbility: number,
  defenseAbility: number
): number => {
  return Math.floor(
    shootingAbility *
      (1 - defenseAbility / 100) *
      SETTINGS.OFFENSIVE.SHOOTING_ADJUSTAMENT
  );
};
