import express from "express";
import { addToCart } from "../controller/cartController.js";

export const cartRouter = express.Router();

cartRouter.post("/add-to-cart/:id", addToCart);