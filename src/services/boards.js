import { Board } from '../db/models/Board.js';

export const getBoards = async () => {
  return await Board.find({});
};

export const createBoard = async (payload) => {
  return await Board.create(payload);
};

export const getBoardById = async (id) => {
  return await Board.findById({ _id: id });
};

export const deleteBoard = async (id) => {
  return await Board.deleteOne({ _id: id });
};

export const updateBoard = async (payload, id) => {
  return await Board.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};
