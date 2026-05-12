import mongoose, { Schema, Document } from "mongoose";

export interface IMatrix extends Document {
  code: string;
  level: number;
  blocked: boolean;
  address: string;
  currentReferrer: string;
  partnersCount: number;
  reinvestCount: number;
  firstLevel: string[];
  secondLevel: string[];
  thirdLevel: string[];
  FourthLevel: string[];
  FifthLevel: string[];
  SixthLevel: string[];
  SeventhLevel: string[];
}

const MatrixSchema: Schema<IMatrix> = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    level: {
      type: Number,
      max: 7,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: true,
    },
    currentReferrer: {
      type: String,
      required: true,
    },
    partnersCount: {
      type: Number,
      default: 0,
    },
    reinvestCount: {
      type: Number,
      default: 0,
    },
    firstLevel: {
      type: [String],
      default: [],
    },
    secondLevel: {
      type: [String],
      default: [],
    },
    thirdLevel: {
      type: [String],
      default: [],
    },
    FourthLevel: {
      type: [String],
      default: [],
    },
    FifthLevel: {
      type: [String],
      default: [],
    },
    SixthLevel: {
      type: [String],
      default: [],
    },
    SeventhLevel: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const MATRIX = mongoose.model<IMatrix>("MATRIX", MatrixSchema);
