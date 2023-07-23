import { Mongoose } from 'mongoose';

export const BlockSchema = new Mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Block = Mongoose.model('Block', BlockSchema);

export default Block;
