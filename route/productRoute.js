import express from "express";

import { createProduct, deleteSingleProduct, getAllProducts, getSingleProduct, updateSingleProduct } from "../controller/productController.js";

export const productRouter = express.Router();

productRouter.post("/create-new-product", createProduct);
productRouter.get("/show-all-products", getAllProducts);
productRouter.get("/show-single-product/:id", getSingleProduct);
productRouter.put("/update-product/:id", updateSingleProduct);
productRouter.delete("/delete-product/:id", deleteSingleProduct);