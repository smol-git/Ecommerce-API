import express from "express";
import { createUser, getAllUser, getSingleUser, updateSingleUser,deleteSingleUser,updatePassword, userForgetPassword, userLogIn, userOtpVerify } from "../controller/userController.js";


export const router = express.Router();

//calling all the functions CRUD

//create new user
router.post("/create-user", createUser)

//user login route
router.post("/user-login", userLogIn)

//get all users
router.get("/get-all-user", getAllUser)

//get single user
router.get("/user/:username", getSingleUser)

//update single user
router.put("/user/:id", updateSingleUser)

//delete single user
router.delete("/user/:id", deleteSingleUser)

//reset password
router.post("/user/update-password", updatePassword)

//user forget password
router.post("/user-forget-password", userForgetPassword)

//user OTP verification
router.post("/user-verify-otp/:id", userOtpVerify)