import { authService } from "../services/auth.service.js";

export function auth(req, res){
    const auth = authService()
    res.status(200).json(auth)
}