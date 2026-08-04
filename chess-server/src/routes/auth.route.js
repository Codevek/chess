import { Router } from "express";
import { registerUser, login } from "../controllers/auth.controller.js";

const authRoute = Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", login);


export default authRoute;