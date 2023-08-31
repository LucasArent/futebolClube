import IMatches from '../Interfaces/IMatches';
import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from './service.response';
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
}

export default MatchesService;
