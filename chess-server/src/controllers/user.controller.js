import { searchUsersService } from "../services/user.service.js";

export function searchUsers(req, res){
    const query = req.query.q
    res.status(200).json(searchUsersService(query, req.user._id))
}