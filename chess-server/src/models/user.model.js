import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default: "/avatars/default.png",
  },

  country: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    default: 1200,
  },

  friends: {
    type: [String],
    default: [],
  },

  friendRequests: {
    type: [String],
    default: [],
  },

  lastSeen: {
    type: Date,
  },
}, {timestamps: true});

export const user = mongoose.model("user", userSchema)