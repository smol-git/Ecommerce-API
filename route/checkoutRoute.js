import express from "express";
import { checkUserRegister } from "../controller/checkoutController.js";


export const checkOutRouter = express.Router();

checkOutRouter.get("/email-check", checkUserRegister)