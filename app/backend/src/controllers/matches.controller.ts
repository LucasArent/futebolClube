import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  private matchesService: MatchesService;

  constructor(matchesService: MatchesService = new MatchesService()) {
    this.matchesService = matchesService;
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
}
export default MatchesController;
