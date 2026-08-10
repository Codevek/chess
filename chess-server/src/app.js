import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import userRoute from "./routes/users.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/users", userRoute)
app.use("/auth", authRoute)

app.use(errorMiddleware)

export default app;