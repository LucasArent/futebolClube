import { Request, Router, Response } from 'express';
import LoginController from '../controllers/login.controller';
import ValidateToken from '../middlewares/validade.token';

const loginController = new LoginController();

const router = Router();

router.get(
  '/',
  ValidateToken.validateToken,
  (req: Request, res: Response) => loginController.getUser(req, res),
);

export default router;
