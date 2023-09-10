import IMatches from './IMatches';
import { DataMatche, Match } from '../Request/matchRequest';

interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  filterMatches(boolean: string): Promise<IMatches[]>,
  finishMatche(id: number): Promise<void>,
  updateMatch(id: number, data: Match): Promise<void>,
  changes(data: DataMatche): Promise<IMatches>,
}

export default IMatchesModel;
