import { getCurrentUserService } from "../services/auth.service.js";
import { acceptFriendRequestService, deleteFriendService, getFriendRequestsService, getFriendsService, rejectFriendrequestService, sendFriendRequestService } from "../services/friend.service.js";
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

export const acceptFriendRequest = asyncHandler(async (req, res) => {
  const acceptRequest = await acceptFriendRequestService(req.user._id, req.params.userId)
  res.status(200).json(new ApiResponse(200, acceptRequest, "Friend request accepted."))
})

export const rejectFriendRequest = asyncHandler(async (req, res) => {
  const rejectRequest = await rejectFriendrequestService(req.user._id, req.params.userId)
  res.status(200).json(new ApiResponse(200, rejectRequest, "Friend request rejected."))
})

export const getFriends = asyncHandler(async (req, res) => {
  const friends = await getFriendsService(req.user._id)
  res.status(200).json(new ApiResponse(200, friends, "Friends Fetched."))
})

export const deleteFriend = asyncHandler(async (req, res) => {
  const acceptRequest = await deleteFriendService(req.user._id, req.params.userId)
  res.status(200).json(new ApiResponse(200, acceptRequest, "Removed Friend."))
})