import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";
import { User } from "../models/user.model.js";

export async function socketAuth(socket, next) {
  const cookieHeader = socket.handshake.headers.cookie;

  if (!cookieHeader) {
    return next(new Error("Unauthorized"));
  }
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("=")),
  );
  const decoded = jwt.verify(cookies.accessToken, ACCESS_TOKEN_SECRET);
  console.log(decoded);
  const user = await User.findById(decoded._id).select(
    `-password -refreshToken`,
  );
  socket.user = user;
  next();
}
