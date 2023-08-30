import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
import loginRouter from './login.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/login/role', loginRouter);

export default router;
