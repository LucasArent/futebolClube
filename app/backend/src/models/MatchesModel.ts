import { DataMatche } from '../Types/matchRequest';
import IMatches from '../Interfaces/IMatches';
import IMatchesModel from '../Interfaces/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';

class MatchesModel implements IMatchesModel {
  private model: typeof SequelizeMatches;

  constructor() {
    this.model = SequelizeMatches;
  }

  findAll = async (): Promise<IMatches[]> =>
    this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    })
  ;

  filterMatches = async (inProgress: string): Promise<IMatches[]> =>
    this.model.findAll({
      where: {
        inProgress: inProgress === 'false' ? 0 : 1,
      },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

  finishMatche = async (id: number): Promise<void> => {
    await this.model.update({ inProgress: false }, {
      where: { id },
    });
  };

  updateMatch = async (id: number, data: IMatches): Promise<void> => {
    // Promise<Match>
    await this.model.update(data, { where: { id } });
  };

  changes = async (data: DataMatche): Promise<IMatches> => {
    const dbData = await this.model.create({ inProgress: true, ...data });
    return dbData;
  };
}

export default MatchesModel;
