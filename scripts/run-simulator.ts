import { DATA } from "../data/data-simulator";
import { SIMULATOR_OPTIONS } from "../src/configuration/simulator-options";
import { basketballSimulation } from "../src/core";

SIMULATOR_OPTIONS.debugMode = true;

basketballSimulation(DATA.teams[0], DATA.teams[1]);
