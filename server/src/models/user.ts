import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  address: string;
  referrer: string;
  activeLevels: boolean[];
}

const UserSchema: Schema<User> = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    referrer: {
      type: String,
      required: true,
    },
    activeLevels: {
      type: [Boolean],
      default: [false, false, false, false, false, false, false, false],
    },
  },
  { timestamps: true }
);

export const USER = mongoose.model<User>("USER", UserSchema);
