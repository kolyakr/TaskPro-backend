import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createCardController,
  deleteCardController,
  getCardByIdController,
  getCardsController,
  updateCardController,
} from '../controllers/cards.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createCardSchema } from '../validations/createCardSchema.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { updateCardSchema } from '../validations/updateCardSchema.js';

export const cardsRouter = Router();
cardsRouter.use('/:cardId', validateMongoId('cardId'));

cardsRouter.get('/', ctrlWrapper(getCardsController));

cardsRouter.post(
  '/',
  validateBody(createCardSchema),
  ctrlWrapper(createCardController),
);

cardsRouter.get('/:cardId', ctrlWrapper(getCardByIdController));

cardsRouter.delete('/:cardId', ctrlWrapper(deleteCardController));

cardsRouter.patch(
  '/:cardId',
  validateBody(updateCardSchema),
  ctrlWrapper(updateCardController),
);
