import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity:{
        type: Number,
        default: 1
    }
})

const schema = mongoose.model("Cart", cartSchema);
export default schema;