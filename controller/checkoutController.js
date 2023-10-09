import Checkout from "../model/checkoutModel.js"
import User from "../model/userModel.js"
import Cart from "../model/cartModel.js"

export const checkUserRegister = async (req, res) => {
    try {
        const { email } = req.body;
        const emailCheck = await User.findOne({ email });
        if (!emailCheck) {
            return res.status(201).json({ message: "Register first" })
        }
        res.status(200).json({message: "api running"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}