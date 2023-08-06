import { SimulationResult } from "../../constants";
import { Team } from "../models";
import { generateReport } from "./game-report";
import {
  addPointsToScore,
  initializeGameState,
  pushGameEvent,
  setTeamPossession,
} from "./game-state";
import { shortRangeAttempt } from "./offensive/short-range-attempt";
import { getRandomPlayer, isLocalTeam } from "./utils";

export const basketballSimulation = (localTeam: Team, awayTeam: Team) => {
  const GAME_STATE = initializeGameState(localTeam, awayTeam);

  while (GAME_STATE.timeRemainingSeconds > 0) {
    const timeForAction = Math.floor(Math.random() * 24) + 1;
    GAME_STATE.timeRemainingSeconds -= timeForAction;

    /*const attackingTeamPlayers =
      GAME_STATE.ballPossession.team === TeamType.LOCAL
        ? localPlayers
        : awayPlayers;*/

    const defendingTeamPlayers = isLocalTeam(GAME_STATE.ballPossession.team)
      ? GAME_STATE.info.awayTeam.players
      : GAME_STATE.info.localTeam.players;

    //TODO: seleccionar el defensor más razonable por posición y situación del juego.
    const attackResult = shortRangeAttempt(
      GAME_STATE.ballPossession.player,
      getRandomPlayer(defendingTeamPlayers)
    );

    const attackerName =
      GAME_STATE.ballPossession.player.personalInfo.name +
      " " +
      GAME_STATE.ballPossession.player.personalInfo.surname;
    const attackType = "lanza de 2";

    if (attackResult === SimulationResult.SUCCESS) {
      const points = 2; // Ajusta esto según sea necesario

      addPointsToScore(GAME_STATE, points);

      const playerId = GAME_STATE.ballPossession.player.id;
      if (!GAME_STATE.playerStats[playerId]) {
        GAME_STATE.playerStats[playerId] = { points: 0 };
      }

      GAME_STATE.playerStats[playerId].points += points;

      GAME_STATE.ballPossession.player = getRandomPlayer(defendingTeamPlayers);
      setTeamPossession(GAME_STATE);
      pushGameEvent(
        GAME_STATE,
        `Jugador ${attackerName} lleva el balón y ${attackType}, anota.`
      );
    } else {
      GAME_STATE.ballPossession.player = getRandomPlayer(defendingTeamPlayers);
      setTeamPossession(GAME_STATE);
      pushGameEvent(
        GAME_STATE,
        `Jugador ${attackerName} lleva el balón y ${attackType} y falla.`
      );
    }

    if (GAME_STATE.timeRemainingSeconds <= 0) break;
  }

  generateReport(GAME_STATE, localTeam, awayTeam);
  const report = GAME_STATE.events.join("\n");
  console.log(report);
};
