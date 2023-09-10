 type Match = {
   homeTeamGoals: number,
   awayTeamGoals: number,
 };

type DataMatche = {
  id?: number,
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean,
};

export type { Match };
export type { DataMatche };
