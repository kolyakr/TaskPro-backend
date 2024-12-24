import createHttpError from 'http-errors';
import {
  createBoard,
  getBoardById,
  getBoards,
  updateBoard,
} from '../services/boards.js';

export const getBoardsController = async (req, res) => {
  const boards = await getBoards();

  res.json({
    status: 200,
    message: 'Boards successfully got',
    data: boards,
  });
};

export const createBoardController = async (req, res) => {
  const { body } = req;
  const board = await createBoard(body);

  res.json({
    status: 201,
    message: 'Board created',
    data: board,
  });
};

export const getBoardByIdController = async (req, res) => {
  const { boardId } = req.params;
  const board = await getBoardById(boardId);

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  res.json({
    status: 200,
    message: 'Board was successfully got',
    data: board,
  });
};

export const deleteBoardController = async (req, res) => {
  const { boardId } = req.params;
  const result = await deleteBoard(boardId);

  if (!result || result.deletedCount === 0) {
    throw createHttpError(404, 'Borad not found');
  }

  res.json({
    status: 204,
    message: 'Board was successfully deleted',
  });
};

export const updateBoardController = async (req, res) => {
  const { body } = req;
  const { boardId } = req.params;

  const board = await updateBoard(body, boardId);

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  res.json({
    status: 200,
    message: 'Board successfully updated',
    data: board,
  });
};
