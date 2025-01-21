import { isValidObjectId } from 'mongoose';
import { Card } from '../db/models/Card.js';
import createHttpError from 'http-errors';
import { Column } from '../db/models/Column.js';

export const getCards = async () => {
  return await Card.find({});
};

export const createCard = async (payload) => {
  if (!isValidObjectId(payload.columnId)) {
    throw createHttpError(401, 'Column id is invalid');
  }
  const isColumnExists = await Column.findById(payload.columnId);

  if (!isColumnExists) {
    throw createHttpError(404, 'Column not found');
  }

  const card = await Card.create(payload);

  return {
    cardId: card._id,
    title: card.title,
    description: card.description,
    priority: card.priority,
    deadline: card.deadline,
  };
};

export const getCardById = async (id) => {
  return await Card.findOne({
    _id: id,
  });
};

export const deleteCard = async (id) => {
  return await Card.deleteOne({
    _id: id,
  });
};

export const updateCard = async (id, payload) => {
  const card = await Card.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return {
    cardId: card._id,
    title: card.title,
    description: card.description,
    priority: card.priority,
    deadline: card.deadline,
  };
};
