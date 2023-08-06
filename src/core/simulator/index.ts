import { SimulationResult } from "../../constants/simulation-result";
import { getRandomIndex } from "../../utils";
import { Player, Team } from "../models";
import { shortRangeAttempt } from "./offensive/short-range-attempt";

enum TeamType {
  LOCAL = "LOCAL",
  AWAY = "AWAY",
}
interface PlayerStats {
  points: number;
  // Otros datos estadísticos aquí...
}

interface GameState {
  timeRemainingSeconds: number;
  teamScores: { [key: string]: number };
  playerStats: { [playerId: number]: PlayerStats };
  ballPossession: {
    team: TeamType;
    player: Player;
  };
  events: string[];
}

const getRandomPlayer = (players: Player[]) => {
  const index = getRandomIndex(players.length);
  return players[index];
};

const extractPlayers = (team: Team) => {
  return [...team.players];
};

export const basketballSimulation = (localTeam: Team, awayTeam: Team) => {
  const localPlayers = extractPlayers(localTeam);
  const awayPlayers = extractPlayers(awayTeam);

  const startingTeam = Math.random() < 0.5 ? TeamType.LOCAL : TeamType.AWAY;
  const startingPlayers =
    startingTeam === TeamType.LOCAL ? localPlayers : awayPlayers;

  const gameState: GameState = {
    timeRemainingSeconds: 720,
    playerStats: {},
    teamScores: {
      [localTeam.name]: 0,
      [awayTeam.name]: 0,
    },
    ballPossession: {
      team: startingTeam,
      player: getRandomPlayer(startingPlayers),
    },
    events: [],
  };

  while (gameState.timeRemainingSeconds > 0) {
    const timeForAction = Math.floor(Math.random() * 24) + 1;
    gameState.timeRemainingSeconds -= timeForAction;

    /*const attackingTeamPlayers =
      gameState.ballPossession.team === TeamType.LOCAL
        ? localPlayers
        : awayPlayers;*/
    const defendingTeamPlayers =
      gameState.ballPossession.team === TeamType.LOCAL
        ? awayPlayers
        : localPlayers;

    const attackResult = shortRangeAttempt(
      gameState.ballPossession.player,
      getRandomPlayer(defendingTeamPlayers)
    );

    const attackerName =
      gameState.ballPossession.player.personalInfo.name +
      " " +
      gameState.ballPossession.player.personalInfo.surname;
    const attackType = "lanza de 2";

    if (attackResult === SimulationResult.SUCCESS) {
      const points = 2; // Ajusta esto según sea necesario

      gameState.teamScores[
        gameState.ballPossession.team === TeamType.LOCAL
          ? localTeam.name
          : awayTeam.name
      ] += points;

      const playerId = gameState.ballPossession.player.id;
      if (!gameState.playerStats[playerId]) {
        gameState.playerStats[playerId] = { points: 0 };
      }

      gameState.playerStats[playerId].points += points;

      gameState.ballPossession.team =
        gameState.ballPossession.team === TeamType.LOCAL
          ? TeamType.AWAY
          : TeamType.LOCAL;
      gameState.ballPossession.player = getRandomPlayer(defendingTeamPlayers);
      gameState.events.push(
        `Jugador ${attackerName} lleva el balón y ${attackType}, anota.`
      );
    } else {
      gameState.ballPossession.team =
        gameState.ballPossession.team === TeamType.LOCAL
          ? TeamType.AWAY
          : TeamType.LOCAL;
      gameState.ballPossession.player = getRandomPlayer(defendingTeamPlayers);
      gameState.events.push(
        `Jugador ${attackerName} lleva el balón y ${attackType} y falla.`
      );
    }

    if (gameState.timeRemainingSeconds <= 0) break;
  }

  generateReport(gameState, localTeam, awayTeam);
  const report = gameState.events.join("\n");
  console.log(report);
};

const generateReport = (
  gameState: GameState,
  localTeam: Team,
  awayTeam: Team
) => {
  console.log(
    `Resultado final: ${localTeam.name} ${
      gameState.teamScores[localTeam.name]
    } - ${awayTeam.name} ${gameState.teamScores[awayTeam.name]}`
  );

  for (const team of [localTeam, awayTeam]) {
    console.log(`Estadísticas del equipo ${team.name}:`);
    // Aquí podrías imprimir estadísticas de equipo adicionales

    console.log(`Estadísticas de los jugadores:`);
    for (const player of team.players) {
      const stats = gameState.playerStats[player.id];
      console.log(
        `Nombre del jugador: ${player.personalInfo.name} ${player.personalInfo.surname} - ${stats.points}`
      );
      // Aquí podrías imprimir estadísticas del jugador adicionales
    }
  }
};
