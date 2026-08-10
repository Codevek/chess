import { searchUsersService } from "../services/user.service.js";

export function searchUsers(req, res){

    res.status(200).json(searchUsersService())
}