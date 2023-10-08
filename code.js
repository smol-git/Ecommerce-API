//importing what important for project
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { router } from "./route/userRoute.js";
import { productRouter } from "./route/productRoute.js";
import dotenv from "dotenv";
import { cartRouter } from "./route/cartRoute.js";

dotenv.config();

//variables
const app = express();
const port = process.env.Port;

//using app.use to get access to other objects
app.use(bodyParser.json());
app.use('/api', router);
app.use('/api', productRouter)
app.use('/api', cartRouter)

// mongoDB connection
mongoose.connect(process.env.MongoDB_URL)
mongoose.connection.on("connected", ()=>{
  console.log("Database Connected")
})

//checking server is running or not
app.listen(port, ()=>{
  console.log("Testing Serve with mongoDB")
})