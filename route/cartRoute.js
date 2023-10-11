import express from "express";
import { addToCart, createCartForUser } from "../controller/cartController.js";

export const cartRouter = express.Router();

cartRouter.put("/add-to-cart", addToCart);
cartRouter.post("/create-user-cart/:id", createCartForUser)