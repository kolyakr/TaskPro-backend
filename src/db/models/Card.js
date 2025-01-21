import { model, Schema } from 'mongoose';

export const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    reuired: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ['without priority', 'low', 'medium', 'high'],
    default: 'without priority',
  },
  deadline: {
    type: Date,
    required: true,
  },
  columnId: {
    type: Schema.ObjectId,
    required: true,
  },
});

export const Card = model('cards', CardSchema);
