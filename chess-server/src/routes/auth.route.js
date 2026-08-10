import { Router } from "express";
import { registerUser, login, logout, getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", login);
authRoute.post("/logout", verifyJWT, logout);

authRoute.get("/me", verifyJWT, getCurrentUser);



export default authRoute;