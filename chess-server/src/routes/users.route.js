import { Router } from "express";
import { searchUsers } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const userRoute = Router();

userRoute.get("/search", verifyJWT, searchUsers);

export default userRoute;