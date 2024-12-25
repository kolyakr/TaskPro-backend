import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  updateUserProfileController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema } from '../validations/registerUserSchema.js';
import { loginUserSchema } from '../validations/loginUserSchema.js';
import { upload } from '../middlewares/upload.js';
import { updateUserProfileSchema } from '../validations/updateUserProfileSchema.js';
import { authorization } from '../middlewares/authorization.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  upload.single('avatar'),
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshSessionController));

authRouter.patch(
  '/update',
  authorization,
  upload.single('avatar'),
  validateBody(updateUserProfileSchema),
  ctrlWrapper(updateUserProfileController),
);
