import { registerService } from "../services/auth.service.js"
import ApiResponse from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const registerUser = asyncHandler(async(req, res)=> {
    const user =  await (registerService(req.body))
    res.status(201).json(new ApiResponse(201, user, "userCreated"))
})