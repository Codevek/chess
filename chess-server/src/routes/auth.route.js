import { Router } from "express";
import { auth } from "../controllers/auth.controller.js";

const authRoute = Router();

authRoute.get("/", auth);

export default authRoute;