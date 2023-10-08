import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    }
})

const schema = mongoose.model("Product", productSchema);
export default schema;