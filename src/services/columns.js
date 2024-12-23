import { isValidObjectId } from 'mongoose';
import { Board } from '../db/models/Board.js';
import { Column } from '../db/models/Column.js';
import createHttpError from 'http-errors';

export const getColumns = async () => {
  return await Column.find({});
};

export const getColumnById = async (id) => {
  return await Column.find({ _id: id });
};

export const createColumn = async (payload) => {
  if (!isValidObjectId(payload.boardId)) {
    throw createHttpError(401, 'Board id is invalid');
  }

  const isBoardExist = await Board.findById(payload.boardId);

  if (!isBoardExist) {
    throw createHttpError(404, `Board ${payload.boardId} doesn't  exist`);
  }

  return await Column.create(payload);
};

export const deleteColumn = async (id) => {
  return await Column.deleteOne({
    _id: id,
  });
};

export const updateColumn = async (title, id) => {
  return await Column.findOneAndUpdate(
    { _id: id },
    { title: title },
    {
      new: true,
    },
  );
};
