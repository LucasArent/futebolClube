import IMatches from './IMatches';

interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  filterMatches(boolean: string): Promise<IMatches[]>,
}

export default IMatchesModel;
