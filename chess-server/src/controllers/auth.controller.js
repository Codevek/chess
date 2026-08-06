import { cookieOptions } from "../config/cookieOptions.js";
import { loginService, registerService } from "../services/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cookie from "cookie-parser";

export const registerUser = asyncHandler(async (req, res) => {
  const user = await registerService(req.body);
  res.status(201).json(new ApiResponse(201, user, "userCreated"));
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginService(req.body);
  res
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user,
          accessToken,
          refreshToken,
        },
        "Login Successful",
      ),
    );
});

export const logout = asyncHandler(async (req, res)=> {
    
})