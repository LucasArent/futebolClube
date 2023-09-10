import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
import loginRouter from './login.routes';
import mactheRouter from './matche.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/login/role', loginRouter);
router.use('/matches', mactheRouter);
router.use('/leaderboard/home', leaderboardRouter);

export default router;
