export interface OffensiveSkill {
  outsideSkill: OutsideSkill;
  insideSkill: InsideSkill;
  playmakingSkill: PlaymakingSkill;
  offensiveRebound: number;
  IQ: number;
}

export interface OutsideSkill {
  shortRangeShot: number;
  midRangeShot: number;
  largeRangeShot: number;
  freePointShot: number;
}

export interface InsideSkill {
  layup: number;
  dunk: number;
  post: number;
}

export interface PlaymakingSkill {
  pass: number;
  dribbling: number;
  handle: number;
}
