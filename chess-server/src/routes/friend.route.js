import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, deleteFriend, getFriendRequests, getFriends, rejectFriendRequest, sendFriendRequest } from "../controllers/friend.controller.js";

const friendRoute = Router()

friendRoute.post("/sendRequest/:userId", verifyJWT, sendFriendRequest)
friendRoute.get("/requests", verifyJWT, getFriendRequests)
friendRoute.post("/acceptRequest/:userId", verifyJWT, acceptFriendRequest)
friendRoute.post("/rejectRequest/:userId", verifyJWT, rejectFriendRequest)
friendRoute.get("/", verifyJWT, getFriends)
friendRoute.delete("/:userId", verifyJWT, deleteFriend)

export default friendRoute