import Checkout from "../model/checkoutModel.js"
import User from "../model/userModel.js"
import Cart from "../model/cartModel.js"

// create order
export const newOrder = async (req,res) => {
    try{
        const {userId, cartId, totalOrderPrice, shippingAddress,
            paymentMethod, transactionId} = req.body;
   
        if (userId && cartId && totalOrderPrice && shippingAddress && paymentMethod
                && transactionId){
            
            const order = new Checkout({userId, cartId, totalOrderPrice, shippingAddress,
                paymentMethod, transactionId});
        
            await order.save();
            return res.status(200).json(order)
    
        } else{
            return res.status(400).json({message: "Please provide all required fields."})
        }

    } catch (error){
        res.status(400).json(error.message)
    }
}

// check order status
export const orderStatusUpdate = async (req,res) => {
    try{
        const {orderId} = req.params;
        const {userId, orderStatus} = req.body;
        
        let order = await Checkout.findById(orderId);
        if (!order) {
            return res.status(404).json({message: "Order doesn't exist"})
        }
        order.orderStatus = orderStatus;
        await order.save();

        let user = await User.findById(userId)

        // const mailOptions = {
        //     from: process.env.TRANS_EMAIL,
        //     to: user.email,
        //     subject: 'Order Status',
        //     text: `Your order status is: ${orderStatus}`
        // };
    
        // transporter.sendMail(mailOptions, (error)=>{
        //     if(error){
        //     console.error('Error sending email:', error);
        //     return res.status(500).json({error: 'Internal server error'});
        //     } 
        // });
        
        res.status(200).json({message: "Order updated successfully", order})

    } catch(error){
        res.status(400).json({message: error.message})
    }
}

// get user orders
export const getUserOrders = async (req,res) => {
    try {
        const {userId} = req.params;
        let page = req.query.page;
        let pageLimit = req.query.limit

        const orders = await Checkout.find({userId})
        .populate('userId', 'username email firstName lastName')
        .populate('cartId', 'items')
        .skip((page-1)*pageLimit)
        .limit(pageLimit);
        
        res.status(200).json(orders);

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}