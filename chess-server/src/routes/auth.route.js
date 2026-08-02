import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const authRoute = Router();

authRoute.post("/register", registerUser);

export default authRoute;