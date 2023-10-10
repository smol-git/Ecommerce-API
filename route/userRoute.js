import express from "express";
import { createUser, getAllUser, getSingleUser, updateSingleUser, userForgetPassword, userLogIn, userOtpVerify } from "../controller/userController.js";
import { deleteSingleUser } from "../controller/userController.js";

export const router = express.Router();

//calling all the functions CRUD

//get all users
router.get("/user", getAllUser)

//get single user
router.get("/user/:username", getSingleUser)

//create new user
router.post("/user", createUser)

//update single user
router.put("/user/:id", updateSingleUser)

//delete single user
router.delete("/user/:id", deleteSingleUser)

//user login route
router.post("/login", userLogIn)

//user forget password
router.post("/forget-password", userForgetPassword)

//user OTP verification
router.post("/verify-otp/:id", userOtpVerify)