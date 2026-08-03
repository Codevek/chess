import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  MONGO_URI,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET
} = process.env;
