import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import TeamService from '../services/team.service';
import { DataMatche, Match } from '../Types/matchRequest';

class MatchesController {
  private matchesService: MatchesService;
  private teamService: TeamService;

  constructor(matchesService: MatchesService = new MatchesService()) {
    this.matchesService = matchesService;
    this.teamService = new TeamService();
  }

  getFilterMatche = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress === 'false' || inProgress === 'true') {
      const filtered = await this.matchesService.getFilteredMatches(inProgress);
      return res.status(200).json(filtered.data);
    }

    const allMatches = await this.matchesService.getAllMatches();
    return res.status(200).json(allMatches.data);
  };

  finishMatche = async (req: Request, res: Response) => {
    const { id } = req.params;
    const filtered = await this.matchesService.finishMatche(Number(id));
    return res.status(200).json(filtered.data);
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const data: Match = { homeTeamGoals, awayTeamGoals };
    const matchUpdate = await this.matchesService.updateMatch(Number(id), data);
    return res.status(200).json(matchUpdate.data);
  };

  checkTeam = async (teams: Array<number>): Promise<boolean> => {
    const allTeams = await Promise.all(
      teams.map(async (team) => this.teamService.getTeamById(team)),
    );
    return allTeams.every((team) => team.status === 'SUCCESSFUL');
  };

  changes = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    const dntHave = await this.checkTeam([homeTeamId, awayTeamId]);
    if (!dntHave) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }
    const data: DataMatche = { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals };
    const filteredMatches = await this.matchesService.changes(data);
    return res.status(201).json(filteredMatches.data);
  };
}

export default MatchesController;
