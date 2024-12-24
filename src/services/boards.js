import createHttpError from 'http-errors';
import { Board } from '../db/models/Board.js';
import { Card } from '../db/models/Card.js';
import { Column } from '../db/models/Column.js';
import { deleteColumn, getColumns } from './columns.js';

export const getBoards = async () => {
  const boards = await Board.find({});

  const boardArray = await Promise.all(
    boards.map(async (board) => {
      const filtersParams = {
        boardId: board._id,
      };
      const columns = await getColumns(filtersParams);

      return {
        ...board._doc,
        columns: columns || [],
      };
    }),
  );

  return boardArray;
};

export const createBoard = async (payload) => {
  return await Board.create(payload);
};

export const getBoardById = async (id) => {
  const board = await Board.findById(id);

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  const filterParams = {
    boardId: board._id,
  };

  const columns = await getColumns(filterParams);

  return {
    ...board._doc,
    columns: columns || [],
  };
};

export const deleteBoard = async (id) => {
  const columns = await Column.find({ boardId: id });
  columns.map(async (column) => {
    await deleteColumn(column._id);
  });

  return await Board.deleteOne({ _id: id });
};

export const updateBoard = async (payload, id) => {
  return await Board.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
};
