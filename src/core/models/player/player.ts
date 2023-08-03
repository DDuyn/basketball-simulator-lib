import { DefensiveSkill } from "./defensive-skill";
import { MentalSkill } from "./mental-skill";
import { OffensiveSkill } from "./offensive-skill";
import { PersonalInfo } from "./personal-info";
import { PhysicalSkill } from "./physical-skill";

export interface Player {
  personalInfo: PersonalInfo;
  physicalSkill: PhysicalSkill;
  mentalSkill: MentalSkill;
  offensiveSkill: OffensiveSkill;
  defensiveSkill: DefensiveSkill;
}
