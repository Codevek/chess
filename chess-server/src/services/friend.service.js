import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

export async function sendFriendRequestService(currentUserId, recieverId) {
  const sender = await User.findById(currentUserId).select(
    "friends friendRequests",
  );
  const receiver = await User.findById(recieverId).select(
    "friends friendRequests",
  );

  if (!receiver) throw new ApiError(404, "User not found");

  if (sender._id.equals(receiver._id)) {
    throw new ApiError(400, "You can't send friendRequest to yourself !");
  }

  if (receiver.friendRequests.includes(currentUserId)) {
    throw new ApiError(400, "Request Already Sent");
  }

  if (receiver.friends.includes(currentUserId)) {
    throw new ApiError(400, "You guys are already friends");
  }

  receiver.friendRequests.push(currentUserId);
  await receiver.save({ validateBeforeSave: false });
}

export async function acceptFriendRequestService(currentUserId, requestId) {
  const currentUser = await User.findById(currentUserId).select(
    "-password -refreshToken",
  );
  const requestUser = await User.findById(requestId).select(
    "-password -refreshToken",
  );

  if (!currentUser || !requestUser) {
    throw new ApiError(404, "User not found");
  }

  if (currentUser.friends.includes(requestId)) {
    throw new ApiError(400, "Already friends");
  }

  if (!currentUser.friendRequests.includes(requestId)) {
    throw new ApiError(400, "Friend request not found.");
  }

  currentUser.friends.push(requestId);
  requestUser.friends.push(currentUserId);

  currentUser.friendRequests = currentUser.friendRequests.filter(
    (n) => n.toString() !== requestId.toString(),
  );

  await currentUser.save({ validateBeforeSave: false });
  await requestUser.save({ validateBeforeSave: false });

  return {
    friendId: requestUser._id,
    username: requestUser.username,
  };
}

export async function getFriendRequestsService(currentUserId) {
  return await User.findById(currentUserId)
    .populate("friendRequests", "username fullName avatar rating isOnline")
    .select("friendRequests");
}

export async function rejectFriendrequestService(currentUserId, requestId) {
  const currentUser =
    await User.findById(currentUserId).select("friendRequests");

  currentUser.friendRequests = currentUser.friendRequests.filter(
    (n) => n.toString() !== requestId.toString(),
  );
  await currentUser.save({ validateBeforeSave: false });
}

export async function deleteFriendService(currentUserId, friendId) {
  const currentUser = await User.findById(currentUserId).select("friends");
  const friend = await User.findById(friendId).select("friends");

  currentUser.friends = currentUser.friends.filter(
    (n) => n.toString() !== friendId.toString(),
  );
  friend.friends = friend.friends.filter(
    (n) => n.toString() !== currentUserId.toString(),
  );

  await currentUser.save({ validateBeforeSave: false });
  await friend.save({ validateBeforeSave: false });

  return currentUser;
}
export async function getFriendsService(currentUserId) {
  return await User.findById(currentUserId)
    .populate("friends", "username fullName avatar rating isOnline")
    .select("friends");
}
