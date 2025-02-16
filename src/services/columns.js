import { isValidObjectId } from 'mongoose';
import { Board } from '../db/models/Board.js';
import { Column } from '../db/models/Column.js';
import createHttpError from 'http-errors';
import { Card } from '../db/models/Card.js';
import { parseColumnFilterParams } from '../utils/parseColumnFilterParams.js';

export const getColumns = async (filtersParams) => {
  filtersParams = parseColumnFilterParams(filtersParams);

  let columns;
  if (filtersParams?.boardId) {
    columns = await Column.find({
      boardId: filtersParams.boardId,
    });
  } else {
    columns = await Column.find({});
  }

  const columnsArray = await Promise.all(
    columns.map(async (column) => {
      let cards;
      if (filtersParams?.priority) {
        cards = await Card.find({
          columnId: column._id,
          priority: filtersParams.priority,
        });
      } else {
        cards = await Card.find({
          columnId: column._id,
        });
      }

      cards = cards.map((card) => {
        return {
          cardId: card._id,
          title: card.title,
          description: card.description,
          priority: card.priority,
          deadline: card.deadline,
        };
      });

      return {
        columnId: column._id,
        title: column.title,
        cards: cards || [],
      };
    }),
  );

  return columnsArray;
};

export const getColumnById = async (id) => {
  const column = await Column.findById(id);

  if (!column) {
    throw createHttpError(404, 'Column not found');
  }

  const cards = await Card.find({
    columnId: column._id,
  });

  return {
    ...column._doc,
    cards: cards || [],
  };
};

export const createColumn = async (payload) => {
  if (!isValidObjectId(payload.boardId)) {
    throw createHttpError(401, 'Board id is invalid');
  }

  const isBoardExist = await Board.findById(payload.boardId);

  if (!isBoardExist) {
    throw createHttpError(404, `Board ${payload.boardId} doesn't  exist`);
  }

  const column = await Column.create(payload);

  return {
    columnId: column._id,
    title: column.title,
    cards: [],
  };
};

export const deleteColumn = async (id) => {
  await Card.deleteMany({
    columnId: id,
  });

  return await Column.deleteOne({
    _id: id,
  });
};

export const updateColumn = async (payload, id) => {
  const column = await Column.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!column) {
    throw createHttpError(401, 'Failed to update column');
  }

  const cards = await Card.find({
    columnId: column._id,
  });

  return {
    columnId: column._id,
    title: column.title,
    cards: column.cards || [],
  };
};
