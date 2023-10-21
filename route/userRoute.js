import express from "express";
import { createUser, getAllUser, getSingleUser, updateSingleUser, userForgetPassword, userLogIn, userOtpVerify } from "../controller/userController.js";
import { deleteSingleUser } from "../controller/userController.js";

export const router = express.Router();

//calling all the functions CRUD

//get all users
router.get("/get-all-user", getAllUser)

//get single user
router.get("/user/:username", getSingleUser)

//update single user
router.put("/user/:id", updateSingleUser)

//delete single user
router.delete("/user/:id", deleteSingleUser)

//create new user
router.post("/create-user", createUser)

//user login route
router.post("/user-login", userLogIn)

//user forget password
router.post("/user-forget-password", userForgetPassword)

//user OTP verification
router.post("/user-verify-otp/:id", userOtpVerify)