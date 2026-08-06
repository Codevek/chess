import { ACCESS_TOKEN_SECRET } from "../config/env";
import ApiError from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req, res, next)=> {
    try {
        const token = req.cookies?.accessToken
        if(!token){
            throw new ApiError(401, "Unauthorised request !")
        }
        jwt.verify(token, ACCESS_TOKEN_SECRET)
    } catch (error) {
        
    }
})