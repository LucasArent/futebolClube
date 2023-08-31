import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getFilterMatche(req, res),
);

export default router;