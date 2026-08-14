import { getCurrentUserService } from "../services/auth.service.js";
import { getFriendRequestsService, sendFriendRequestService } from "../services/friend.service.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendFriendRequest = asyncHandler(async (req, res) => {
  const sendRequest = await sendFriendRequestService(req.user._id, req.params.userId);
  console.log(req.user._id);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        sendRequest,
        "Friend Request sent successfully.",
      ),
    );
});

export const getFriendRequests = asyncHandler(async (req, res) => {
    const getRequests = await getFriendRequestsService(req.user._id)
    res.status(200).json(new ApiResponse(200, getRequests, "Request fetched"))
})