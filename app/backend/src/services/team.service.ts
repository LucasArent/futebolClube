import TeamModel from '../models/TeamModel';
import ITeams from '../Interfaces/teams/ITeams';
import { ServiceResponse } from './service.response';
import { ITeamModel } from '../Interfaces/teams/ITeam.model';

class TeamService {
  private teamModel: ITeamModel;

  constructor(team:ITeamModel = new TeamModel()) {
    this.teamModel = team;
  }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    return {
      status: 'SUCCESSFUL',
      data: await this.teamModel.findAll(),
    };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const getTeam = await this.teamModel.findById(id);
    if (!getTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Team ${id} not found` },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: getTeam,
    };
  }
}

export default TeamService;
