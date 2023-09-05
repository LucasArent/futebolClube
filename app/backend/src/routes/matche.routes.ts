import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matches.controller';
import ValidateToken from '../middlewares/validade.token';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getFilterMatche(req, res),
);

router.patch(
  '/:id/finish',
  ValidateToken.validateToken,
  (req: Request, res: Response) => matchesController.finishMatche(req, res),
);

router.patch(
  '/:id',
  ValidateToken.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

router.post(
  '/',
  ValidateToken.validateToken,
  (req: Request, res: Response) => matchesController.changes(req, res),
);

export default router;
