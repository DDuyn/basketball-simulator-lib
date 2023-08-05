import { SimulationResult } from "../../constants/simulation-result";
import { getRandomIndex } from "../../utils";
import { Player, Team } from "../models";
import { shortRangeAttempt } from "./offensive/short-range-attempt";

enum TeamType {
  LOCAL = "LOCAL",
  AWAY = "AWAY",
}

interface GameState {
  timeRemainingSeconds: number;
  teamScores: { [key in TeamType]: number };
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
    timeRemainingSeconds: 400,
    teamScores: {
      LOCAL: 0,
      AWAY: 0,
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

    const attackingTeamPlayers =
      gameState.ballPossession.team === TeamType.LOCAL
        ? localPlayers
        : awayPlayers;
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
      gameState.teamScores[gameState.ballPossession.team] += 2;
      gameState.ballPossession.team =
        gameState.ballPossession.team === TeamType.LOCAL
          ? TeamType.AWAY
          : TeamType.LOCAL;
      gameState.ballPossession.player = getRandomPlayer(attackingTeamPlayers);
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

  const report = gameState.events.join("\n");
  console.log(report);
  console.table(gameState.teamScores);
};
