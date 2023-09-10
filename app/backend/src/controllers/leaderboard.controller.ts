import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  getLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
    const { data } = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(data);
  };
}

export default LeaderboardController;
