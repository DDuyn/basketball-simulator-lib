import { SimulationResult } from "../../constants";
import { Team } from "../models";
import { generateReport } from "./game-report";
import {
  addPointsToPlayerScore,
  addPointsToTeamScore,
  initializeGameState,
  pushGameEvent,
  setPlayerPossession,
  setTeamPossession,
} from "./game-state";
import { shortRangeAttempt } from "./offensive/short-range-attempt";
import { getRandomPlayer, isHomeTeam } from "./utils";

export const basketballSimulation = (homeTeam: Team, awayTeam: Team) => {
  const GAME_STATE = initializeGameState(homeTeam, awayTeam);

  while (GAME_STATE.timeRemainingSeconds > 0) {
    let playerPossession = GAME_STATE.ballPossession.player;
    const timeForAction = Math.floor(Math.random() * 24) + 1;
    GAME_STATE.timeRemainingSeconds -= timeForAction;

    /*const attackingTeamPlayers =
      GAME_STATE.ballPossession.team === TeamType.LOCAL
        ? localPlayers
        : awayPlayers;*/

    const defendingTeamPlayers = isHomeTeam(GAME_STATE.ballPossession.team)
      ? GAME_STATE.info.awayTeam.players
      : GAME_STATE.info.homeTeam.players;

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

      addPointsToTeamScore(GAME_STATE, points);
      addPointsToPlayerScore(GAME_STATE, points);

      playerPossession = getRandomPlayer(defendingTeamPlayers);
      setPlayerPossession(GAME_STATE, playerPossession);

      setTeamPossession(GAME_STATE);
      pushGameEvent(
        GAME_STATE,
        `Jugador ${attackerName} lleva el balón y ${attackType}, anota.`
      );
    } else {
      playerPossession = getRandomPlayer(defendingTeamPlayers);
      setPlayerPossession(GAME_STATE, playerPossession);
      setTeamPossession(GAME_STATE);
      pushGameEvent(
        GAME_STATE,
        `Jugador ${attackerName} lleva el balón y ${attackType} y falla.`
      );
    }

    if (GAME_STATE.timeRemainingSeconds <= 0) break;
  }

  generateReport(GAME_STATE, homeTeam, awayTeam);
  const report = GAME_STATE.events.join("\n");
  console.log(report);
};
