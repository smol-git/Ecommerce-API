import Product from "../model/productModel.js"
import Cart from "../model/cartModel.js"
import User from "../model/userModel.js"

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity, totalPrice } = req.body;

        const productAdded = await Product.findById(productId);

        const checkCart = await Cart.findOne({userId})
        const productAvailable = checkCart.products.find((item) => item.productId.toString() === productId)
        
        if (productAvailable) {
            productAvailable.quantity += 1;
            await productAvailable.save();
        }
        else {
            checkCart.products.push({productId, quantity})
            // const cart = new Cart({
            //     productId: productId,
            //     quantity: quantity
            // })

            await checkCart.save();

            if (!productAdded) {
                res.status(400).json({ message: "product out of stock" })
            } else {
                res.status(200).json({message: "product added to the cart"});
            }

        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createCartForUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userRegister = await User.findById(id);
        if (!userRegister) {
            return res.status(400).json({ message: "User not exist" })
        }

        let cart = await Cart.findOne({ id }); // finding in cart, if cart is already created for this user?
        if (!cart) {                                 // if cart is not created,
            cart = new Cart({ id, items: [] }); //  create new cart for this user.
        }
        await cart.save();
        res.status(200).json({ message: "Cart created for User" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



