import { User } from "../models/user.model";

export function searchUsersService(query) {
  User.findOne({$or: [{username}, {fullName}]})
}
