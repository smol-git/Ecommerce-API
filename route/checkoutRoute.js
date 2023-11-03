import express from "express";
import { newOrder, orderStatusUpdate, getUserOrders } from "../controller/checkoutController.js";


export const checkOutRouter = express.Router();

checkOutRouter.post("/orders", newOrder)
checkOutRouter.put("/orders/:orderId", orderStatusUpdate)
checkOutRouter.get("/orders/:userId", getUserOrders)