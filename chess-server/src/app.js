import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import healthRoute from "./routes/health.routes.js";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/health", healthRoute)
app.use("/auth", authRoute)


export default app;