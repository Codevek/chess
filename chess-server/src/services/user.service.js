import { User } from "../models/user.model.js";

export async function searchUsersService(query, currentUserId) {
  const find = await User.find({
    $or: [
      {
        username: {
          $regex: query,
          $options: "i",
        },
      },
      {
        fullName: {
          $regex: query,
          $options: "i",
        },
      },
    ],
    _id: { $ne: currentUserId },
  }).select("-refreshToken -password").limit(10)
  console.log(find);
}
