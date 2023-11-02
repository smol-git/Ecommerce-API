import express from "express";
import { addToCart, createCartForUser } from "../controller/cartController.js";

export const cartRouter = express.Router();

cartRouter.post("/create-user-cart/:userId", createCartForUser)
cartRouter.put("/add-to-cart", addToCart);
