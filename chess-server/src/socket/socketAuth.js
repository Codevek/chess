import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";
import { User } from "../models/user.model.js";

export async function socketAuth(socket, next) {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("Unauthorized"));
    }
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("=")),
    );

    if (!cookies.accessToken) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(cookies.accessToken, ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select(
      `-password -refreshToken`,
    );

    if (!user) {
      return next(new Error("Unauthorized"));
    }

    socket.user = user;
    next();
  } catch (error) {
    console.log("Socket Auth Error:", error.message);
    return next(new Error("Unauthorized"));
  }
}
