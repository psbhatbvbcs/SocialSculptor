import { Schema, model } from "mongoose";

var FacebookSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    hashedPassword: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    userId: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const FacebookModel = model("Facebook", FacebookSchema);
