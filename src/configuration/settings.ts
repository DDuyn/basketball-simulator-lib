//TODO: Modificar rango de tiro por los definidos en el modelo
export const SETTINGS = {
  OFFENSIVE: {
    SHOOTING: {
      RANGE_SHOOTING_TWO_POINT: {
        MIN: 0.75,
        MAX: 1,
      },
    },
    SHOOTING_ADJUSTAMENT: 1.25,
    // Otras configuraciones ofensivas...
  },
  DEFENSIVE: {
    DEFENSE: {
      RANGE_DEFENSE_SHOOTING_TWO_POINTS: {
        MIN: 0.35,
        MAX: 0.9,
      },
    },
    // Otras configuraciones defensivas...
  },
  GENERAL: {
    STANDARD_DEVIATION: 0.15,
  },

  // Otras configuraciones generales...
};
