import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

export async function sendFriendRequestService(currentUserId, recieverId) {
    
    const sender = await User.findById(currentUserId).select("-password -refreshToken")
    const reciever = await User.findById(recieverId).select("-password -refreshToken")
    

    if(sender._id.equals(reciever._id)){
        throw new ApiError(400, "You can't send friendRequest to yourself !")
    }
    
    if(reciever.friendRequests.includes(currentUserId)){
        throw new ApiError(400, "Request Already Sent")
    }

    if(reciever.friends.includes(currentUserId)){
        throw new ApiError(400, "You guys are already friends")
    }

    reciever.friendRequests.push(currentUserId)
    await reciever.save({validateBeforeSave: false})
}

export async function acceptFriendRequestService(currentUserId, requestId) {
  const currentUser = await User.findById(currentUserId);
  const requestUser = await User.findById(requestId);

  if (!currentUser || !requestUser) {
    throw new ApiError(404, "User not found");
  }

  if (currentUser.friends.includes(requestId)) {
    throw new ApiError(400, "Already friends");
  }

  currentUser.friends.push(requestId);
  requestUser.friends.push(currentUserId);

  currentUser.friendRequests = currentUser.friendRequests.filter(
    n => n.toString() !== requestId.toString()
  );

  await currentUser.save({ validateBeforeSave: false });
  await requestUser.save({ validateBeforeSave: false });
}

export async function getFriendRequestsService(currentUserId) {
    const currentUserFriendRequests = await User.findById(currentUserId).select("friendRequests")

    return currentUserFriendRequests
}