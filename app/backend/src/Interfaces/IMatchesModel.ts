import IMatches from './IMatches';

interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  filterMatches(boolean: string): Promise<IMatches[]>,
  finishMatche(id: number): Promise<unknown>,
}

export default IMatchesModel;
