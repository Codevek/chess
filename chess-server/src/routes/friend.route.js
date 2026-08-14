import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getFriendRequests, sendFriendRequest } from "../controllers/friend.controller.js";

const friendRoute = Router()

friendRoute.post("/request/:userId", verifyJWT, sendFriendRequest)
friendRoute.get("/requests", verifyJWT, getFriendRequests)

export default friendRoute