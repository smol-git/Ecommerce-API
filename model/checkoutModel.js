import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const schema = mongoose.model("Checkout", checkOutSchema);
export default schema;