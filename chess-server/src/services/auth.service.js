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
  // console.log(username, password);

  //validationOfUserData
  const requiredFields = [fullName, username, email, password];
  Object.entries(requiredFields).map(([key, value]) => {
    if (value?.trim() === "") {
      throw new ApiError(409, "Email req");
    }
  });
//   console.log(use)

  //checkIfUserAlreadyExists: username,email
  const existedUser = await user.findOne({ username });
  if (existedUser) {
    throw new ApiError(400, "Email exists");
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
    country
  })
  
  const accessToken = createdUser.generateAccessToken()
  const refreshToken = createdUser.generateRefreshToken();

  createdUser.refreshToken = refreshToken
  await createdUser.save({validateBeforeSave: false})


  //removePassword&RefreshTokens
  //checkForUserCreation
  //returnResponse
  return createdUser;
}
