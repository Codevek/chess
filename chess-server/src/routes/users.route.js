import { Router } from "express";
import { searchUsers } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.get("/search", searchUsers);

export default userRoute;