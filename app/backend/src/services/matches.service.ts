import { DataMatche, Match } from '../Types/matchRequest';
import IMatches from '../Interfaces/IMatches';
import MatchesModel from '../models/MatchesModel';
import { ServiceResponse, ServiceMessage } from './service.response';
import IMatchesModel from '../Interfaces/IMatchesModel';

class MatchesService {
  private matchesModel: IMatchesModel;

  constructor(matchesModel: IMatchesModel = new MatchesModel()) {
    this.matchesModel = matchesModel;
  }

  getAllMatches = async (): Promise<ServiceResponse<IMatches[]>> => {
    const allMatches = await this.matchesModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: allMatches,
    };
  };

  getFilteredMatches = async (inProgress: string): Promise<ServiceResponse<IMatches[]>> => {
    const filtered = await this.matchesModel.filterMatches(inProgress);
    return {
      status: 'SUCCESSFUL',
      data: filtered,
    };
  };

  finishMatche = async (id: number): Promise<ServiceResponse<ServiceMessage>> => {
    await this.matchesModel.finishMatche(id);
    return { status: 'SUCCESSFUL',
      data: {
        message: 'Finished',
      } };
  };

  updateMatch = async (
    id: number,
    data: Match,
  ): Promise<ServiceResponse<ServiceMessage>> => {
    await this.matchesModel.updateMatch(id, data);
    return {
      status: 'SUCCESSFUL',
      data: {
        message: 'Match update',
      } };
  };

  changes = async (data: DataMatche): Promise<ServiceResponse<DataMatche>> => {
    const createdMatch = await this.matchesModel.changes(data);
    return {
      status: 'SUCCESSFUL',
      data: createdMatch,
    };
  };
}
export default MatchesService;
