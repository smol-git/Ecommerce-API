import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    totalOrderPrice: {type: Number, min: 0},
    orderDate:       {type: Date, default: Date.now},

    shippingAddress: {
        street:     {type: String},
        city:       {type: String},
        postalCode: {type: String},
        country:    {type: String},
    },

    paymentMethod: {type: String},
    transactionId: {type: String},

    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', 'completed', 'cancelled'],
        default: "processing",
      },
});

const schema = mongoose.model("Checkout", checkOutSchema);
export default schema;