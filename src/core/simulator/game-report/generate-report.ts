import { GameState, Team } from "../../models";

export const generateReport = (
  gameState: GameState,
  localTeam: Team,
  awayTeam: Team
) => {
  console.log(
    `Resultado final: ${localTeam.name} ${gameState.teamScores.localTeamScore} - ${awayTeam.name} ${gameState.teamScores.awayTeamScore}`
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
