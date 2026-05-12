import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    data: {
      type: String,
    },
    blockHash: {
      type: String,
    },
    blockNumber: {
      type: Number,
    },
    transactionHash: {
      type: String,
    },
  },
  { timestamps: true }
);

export const GENEVENT = mongoose.model('GENEVENT', EventSchema);
