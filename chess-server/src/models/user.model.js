import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

  refreshToken: {
    type: String,
    default: ""
  }
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName
  }, "jyhfhkfgkkug86546", {expiresIn: "1h"})
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id: this._id,
  }, "jdfhierufhirk864848864ferdsj", {expiresIn: "30d"})
}



export const user = mongoose.model("user", userSchema)