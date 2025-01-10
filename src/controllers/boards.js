import createHttpError from 'http-errors';
import {
  createBoard,
  deleteBoard,
  getBoardById,
  getBoards,
  updateBoard,
} from '../services/boards.js';
import { getColumns } from '../services/columns.js';

export const getBoardsController = async (req, res) => {
  const user = req.user;
  const boards = await getBoards(user);

  res.json({
    status: 200,
    message: 'Boards successfully got',
    data: {
      boards: boards,
    },
  });
};

export const createBoardController = async (req, res) => {
  const { body } = req;
  const user = req.user;
  const payload = { ...body, userId: user._id };
  const board = await createBoard(payload);

  res.json({
    status: 201,
    message: 'Board created',
    data: board,
  });
};

export const getBoardByIdController = async (req, res) => {
  const { boardId } = req.params;
  const user = req.user;
  const board = await getBoardById(boardId, user);

  res.json({
    status: 200,
    message: 'Board was successfully got',
    data: board,
  });
};

export const deleteBoardController = async (req, res) => {
  const { boardId } = req.params;
  const user = req.user;
  const result = await deleteBoard(boardId, user);

  if (!result || result.deletedCount === 0) {
    throw createHttpError(404, 'Board not found');
  }

  res.json({
    status: 204,
    message: 'Board was successfully deleted',
  });
};

export const updateBoardController = async (req, res) => {
  const { body } = req;
  const { boardId } = req.params;
  const user = req.user;

  const board = await updateBoard(body, boardId, user);

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  res.json({
    status: 200,
    message: 'Board successfully updated',
    data: {
      board: board,
    },
  });
};
