import { Router } from 'express';
import { authorization } from '../middlewares/authorization.js';
import { upload } from '../middlewares/upload.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserProfileSchema } from '../validations/updateUserProfileSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getUserInfoController,
  updateUserProfileController,
} from '../controllers/users.js';

export const usersRouter = Router();

usersRouter.get('/', authorization, ctrlWrapper(getUserInfoController));

usersRouter.patch(
  '/update',
  authorization,
  upload.single('avatar'),
  validateBody(updateUserProfileSchema),
  ctrlWrapper(updateUserProfileController),
);
