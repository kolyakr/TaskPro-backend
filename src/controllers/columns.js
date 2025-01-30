import createHttpError from 'http-errors';
import {
  createColumn,
  deleteColumn,
  getColumnById,
  getColumns,
  updateColumn,
} from '../services/columns.js';

export const createColumnController = async (req, res) => {
  const { body } = req;
  const column = await createColumn(body);

  res.json({
    status: 200,
    message: 'Column succesfully created',
    data: {
      column,
    },
  });
};

export const deleteColumnController = async (req, res) => {
  const { columnId } = req.params;
  const result = await deleteColumn(columnId);

  if (!result || result.deletedCount === 0) {
    throw createHttpError(404, 'Column not found');
  }

  res.json({
    status: 204,
    message: 'Column successfully deleted',
    data: {},
  });
};

export const updateColumnController = async (req, res) => {
  const { body } = req;
  const { columnId } = req.params;

  const column = await updateColumn(body, columnId);

  if (!column) {
    throw createHttpError(404, 'Column not found');
  }

  res.json({
    status: 200,
    message: 'Column was successfully updated',
    data: {
      column: column,
    },
  });
};
