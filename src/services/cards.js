import { Card } from '../db/models/Card.js';

export const getCards = async () => {
  return await Card.find({});
};

export const createCard = async (payload) => {
  return await Card.create(payload);
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
  return await Card.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};
