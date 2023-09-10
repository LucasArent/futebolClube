import { Team } from '../Request/leaderboardRequest';

class ClassificationService {
  private team: Team[];
  private name: string;
  private arrays: Team[][];
  private arrayTeams: Team[];
  private nameTeams: string[];

  constructor(team: Team[], nameTeams: string[]) {
    this.team = team;
    this.name = '';
    this.arrayTeams = team;
    this.nameTeams = nameTeams;
    this.arrays = this.makeArray();
  }

  private makeArray() {
    return this.nameTeams.map((nameTime) => (
      this.arrayTeams.filter((team) => (
        team.homeTeam.teamName === nameTime
      ))
    ));
  }

  private totalPoints(): number {
    return (this.win() * 3) + this.draws();
  }

  private win(): number {
    return this.team.filter((data) => {
      if (data.homeTeam.teamName === this.name) {
        return data.homeTeamGoals > data.awayTeamGoals;
      }
      return data.awayTeamGoals > data.homeTeamGoals;
    }).length;
  }

  private lose(): number {
    return this.team.filter((data) => {
      if (data.awayTeam.teamName === this.name) {
        return data.awayTeamGoals < data.homeTeamGoals;
      }
      return data.homeTeamGoals < data.awayTeamGoals;
    }).length;
  }

  private favorGoals(): number {
    return this.team.reduce((acc, crr) => {
      if (crr.homeTeam.teamName === this.name) {
        return acc + crr.homeTeamGoals;
      }
      return acc + crr.awayTeamGoals;
    }, 0);
  }

  private own(): number {
    return this.team.reduce((acc, crr) => {
      if (crr.homeTeam.teamName === this.name) {
        return acc + crr.awayTeamGoals;
      }
      return acc + crr.homeTeamGoals;
    }, 0);
  }

  private draws(): number {
    return this.team.filter((data) => data.homeTeamGoals === data.awayTeamGoals).length;
  }

  private classificationTeams() {
    return this.arrays.map((team, index) => {
      this.team = team;
      this.name = this.nameTeams[index];
      return { name: this.nameTeams[index],
        totalPoints: this.totalPoints(),
        totalVictories: this.win(),
        totalDraws: this.draws(),
        totalGames: team.length,
        totalLosses: this.lose(),
        goalsFavor: this.favorGoals(),
        goalsOwn: this.own(),
        goalsBalance: this.favorGoals() - this.own(),
        efficiency: Number(((this.totalPoints() / (team.length * 3)) * 100).toFixed(2)) };
    });
  }

  public getLeaderboard() {
    const classificationTeams = this.classificationTeams().sort((home, away) => {
      if (home.totalPoints > away.totalPoints) return -1;
      if (home.totalPoints < away.totalPoints) return 1;
      if (home.goalsBalance > away.goalsBalance) return -1;
      if (home.goalsBalance < away.goalsBalance) return 1;
      if (home.goalsFavor > away.goalsFavor) return -1;
      if (home.goalsFavor < away.goalsFavor) return 1;
      return 0;
    });
    return classificationTeams;
  }
}

export default ClassificationService;
