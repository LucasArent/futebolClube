import TeamModel from '../models/TeamModel';
import MatchesModel from '../models/MatchesModel';
import { Team } from '../Request/leaderboardRequest';
import ClassificationService from './classification.service';

class LeaderboardService {
  private matchesModel: MatchesModel;
  private teamsModel: TeamModel;

  constructor(
    matchesModel: MatchesModel
    = new MatchesModel(),
    teamsModel: TeamModel = new TeamModel(),
  ) {
    this.matchesModel = matchesModel;
    this.teamsModel = teamsModel;
  }

  getLeaderboard = async () => {
    const arrayTeams = (await this.matchesModel.filterMatches('false')) as Team[];
    const data = (await this.teamsModel.findAll()).map((team) => team.teamName);

    const count = new ClassificationService(arrayTeams, data);
    const classification = count.getLeaderboard();

    return { status: '', data: classification };
  };
}

export default LeaderboardService;
