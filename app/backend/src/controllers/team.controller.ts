import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public async getAllTeams(_req: Request, res: Response):Promise<Response> {
    const allTeams = await this.teamService.getAllTeams();
    return res.status(200).json(allTeams.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getTeamById(Number(id));
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(200).json(data);
  }
}

export default TeamController;
