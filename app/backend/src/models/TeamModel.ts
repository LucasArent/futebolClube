import ITeams from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeam.model';
import SequelizeTeam from '../database/models/SequelizeTeam';

class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    return this.model.findAll();
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    return this.model.findByPk(id);
  }
}

export default TeamModel;
