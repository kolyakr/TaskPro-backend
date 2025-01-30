import createHttpError from 'http-errors';
import {
  createCard,
  deleteCard,
  getCardById,
  getCards,
  updateCard,
} from '../services/cards.js';

export const createCardController = async (req, res) => {
  const { body } = req;
  const card = await createCard(body);

  res.json({
    status: 201,
    message: 'Card was successfully created',
    data: {
      card: card,
    },
  });
};

export const deleteCardController = async (req, res) => {
  const { cardId } = req.params;
  const result = await deleteCard(cardId);

  if (!result || result.deletedCount === 0) {
    throw createHttpError(404, 'Card not found');
  }

  res.json({
    status: 204,
    message: 'Card was succefully deleted',
    data: {},
  });
};

export const updateCardController = async (req, res) => {
  const { cardId } = req.params;
  const { body } = req;

  const card = await updateCard(cardId, body);

  if (!card) {
    throw createHttpError(404, 'Card not found');
  }

  res.json({
    status: 200,
    message: 'Card was successfully updated',
    data: {
      card: card,
    },
  });
};
