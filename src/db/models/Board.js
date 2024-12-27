import { model, Schema } from 'mongoose';

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
    required: true,
  },
});

export const Board = model('boards', BoardSchema);
