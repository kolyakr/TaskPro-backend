import { Router } from 'express';
import { boardsRouter } from './boards.js';

export const rootRouter = Router();

rootRouter.use('/boards', boardsRouter);
