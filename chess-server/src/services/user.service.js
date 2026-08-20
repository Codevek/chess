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
      // {
      //   _id: {
      //     $options: "i",
      //   },
      // } //it won't work coz _id isn't a string nd these $options only work with strings
    ],
    _id: { $ne: currentUserId },
  }).select("-refreshToken -password").limit(10)
  console.log(find);
}
