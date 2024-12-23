import { model, Schema } from 'mongoose';

export const ColumnSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  boardId: {
    type: Schema.ObjectId,
    required: true,
  },
});

export const Column = model('columns', ColumnSchema);
