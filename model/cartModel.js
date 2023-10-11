import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    products:[{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        },
      
    }],
    totalPrice: {
        type: Number,
    },
    createdTime:{
        type: Date,
        default: Date.now()
    }
})

const schema = mongoose.model("Cart", cartSchema);
export default schema;