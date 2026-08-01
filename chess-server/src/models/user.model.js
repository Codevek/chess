import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  fullName: {
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
    index: true,
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
    required: [true, "password is required"],
  },

  avatar: {
    type: String, //cloudinary url
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