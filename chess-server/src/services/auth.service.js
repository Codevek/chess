import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { accessAndRefreshTokenGenerator } from "../utils/tokenGenerator.js";

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
    if (field?.trim() === "") {
      throw new ApiError(400, `All fields are required, ${field} missing !!`);
    }
  });
  //   console.log(use)

  //checkIfUserAlreadyExists: username,email
  const existedUser = await User.findOne({ $or: [{ username }, { email }] }); //bdhiya cheez hai yaar ye, dono check ho gya ek hi saath
  if (existedUser) {
    throw new ApiError(400, `User already exists`);
  }

  //    testCheck for fallbacck Error
  //  if(true){
  //   throw new Error("errorKaddu: ")
  //  }

  //imageDataCheck&Upload- cloudinary

  //createUserObject- EntryInDB
  const createdUser = await User.create({
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
  const safeUser = await User
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
  const requiredUser = await User.findOne({ $or: [{ username }, { email }] });
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
  const {accessToken, refreshToken} = await accessAndRefreshTokenGenerator(requiredUser._id)

  //safeUserInfo
  const safeUserInfo = await User
    .findById(requiredUser._id)
    .select("-password -refreshToken");
  return {
    user: safeUserInfo,
    accessToken,
    refreshToken,
  };
}

export async function logoutService(userId) {
  await User.findByIdAndUpdate(userId, {
    $set: {refreshToken: undefined}
  }, {new: true})
}

export async function getCurrentUserService(userId) {
  const currentUser = await User.findById(userId).select("-password -refreshToken")

  return currentUser
}