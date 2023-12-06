import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    default: "",
  },
  expiresAt: {
    type: Date,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  verified: {
    type: Boolean,
  },

  token: TokenSchema, // Embedding the TokenSchema here

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("Users", UserSchema);
