import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1, max: 10
        },
        totalPrice: {
            type: Number,
        },
    }],

    totalCartPrice: { type: Number },

    createdTime: {
        type: Date,
        default: Date.now()
    }
})

const schema = mongoose.model("Cart", cartSchema);
export default schema;