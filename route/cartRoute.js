import express from "express";
import { addToCart, createCartForUser, deleteCartProduct, getCartContents } from "../controller/cartController.js";

export const cartRouter = express.Router();

cartRouter.post("/create-user-cart/:userId", createCartForUser)
cartRouter.put("/add-to-cart", addToCart);
cartRouter.delete("/cart/:productId", deleteCartProduct);
cartRouter.get("/cart", getCartContents)
