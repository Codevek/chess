import bcrypt from "bcrypt";
import { user } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

export async function registerService(userData) {
  //getUserDetails
  const {
    fullName,
    username,
    email,
    password,
    avatar,
    country,
    rating,
    friends,
    friendRequests,
    lastSeen,
  } = userData;

  //validationOfUserData
  const requiredFields = [fullName, username, email, password];
  requiredFields.map((field) => {
    if (field.trim() === "") {
      throw new ApiError(400, `All fields are required, ${field} missing !!`);
    }
  });
  //   console.log(use)

  //checkIfUserAlreadyExists: username,email
  const existedUser = await user.findOne({ $or: [{ username }, { email }] }); //bdhiya cheez hai yaar ye, dono check ho gya ek hi saath
  if (existedUser) {
    throw new ApiError(400, `User already exists`);
  }

  //    testCheck for fallbacck Error
  //  if(true){
  //   throw new Error("errorKaddu: ")
  //  }

  //imageDataCheck&Upload- cloudinary

  //createUserObject- EntryInDB
  const createdUser = await user.create({
    username,
    email,
    password,
    fullName,
    country,
  });

  const accessToken = createdUser.generateAccessToken();
  const refreshToken = createdUser.generateRefreshToken();

  createdUser.refreshToken = refreshToken;
  await createdUser.save({ validateBeforeSave: false });

  //removePassword&RefreshTokens
  const safeUser = await user
    .findById(createdUser._id)
    .select("-password -refreshToken");

  //returnResponse
  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
}

export async function loginService(loginData) {
  const { username, password, email } = loginData;

  //validation
  if (!username && !email) {
    throw new ApiError(400, "Username/Email is missing !!");
  }
  if (!password?.trim()) {
    throw new ApiError(400, "Password is missing !!");
  }

  //findUser
  const requiredUser = await user.findOne({ $or: [{ username }, { email }] });
  if (!requiredUser) {
    throw new ApiError(404, "User not Found");
  }

  //passwordCheck
  const isPasswordCorrect = await bcrypt.compare(
    password,
    requiredUser.password,
  );
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Credentials");
  }

  //generate&SaveTokens
  const accessToken = requiredUser.generateAccessToken();
  const refreshToken = requiredUser.generateRefreshToken();

  requiredUser.refreshToken = refreshToken;
  await requiredUser.save({ validateBeforeSave: false });

  //safeUserInfo
  const safeUser = await user
    .findById(requiredUser._id)
    .select("-password -refreshToken");
  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
}
