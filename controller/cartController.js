import Product from "../model/productModel.js"
import Cart from "../model/cartModel.js"
import User from "../model/userModel.js"

export const createCartForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const userRegister = await User.findById(userId);

        if (!userRegister) {
            return res.status(400).json({ message: "User not exist" })
        }

        let cart = await Cart.findOne({ userId });              // finding in cart, if cart is already created for this user?
        
        if (!cart) {                                            // if cart is not created,
            cart = new Cart({ userId, items: [] });
            await cart.save();                                  //  create new cart for this user.
        } else {
            return res.status(400).json({ message: "Cart already exists for user." })
        }

        res.status(200).json({ message: "Cart created for User", cart })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product doesn't exist" });
        }

        let cart = await Cart.findOne({ userId });

        const existingProduct = cart.items.find((item) => item.productId.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity = quantity;
            existingProduct.totalPrice = quantity * product.price;
        } else {
            cart.items.push({ productId, quantity, totalPrice: quantity * product.price })
        }

        let totalCartPrice = 0;
        for (const item of cart.items) {
            totalCartPrice += item.totalPrice;
        }
        cart.totalCartPrice = totalCartPrice;

        await cart.save();
        res.status(200).json({ message: 'Cart updated.', cart });

    } catch (error) {
        res.status(400).json(error.message);
    }
}

//delete cart product
export const deleteCartProduct = async (req,res) => {
    try{
        const {productId} = req.params;
        const {userId, totalCartPrice} = req.body;

        let cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(404).json({message: "Cart for user doesn't exist"})
        }

        const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (productIndex === -1){
            return res.status(404).json({ message: 'Product is not in the cart' });
        }

        console.log(productIndex)

        cart.items.splice(productIndex, 1)    // Revision Needed
        cart.totalCartPrice = totalCartPrice;

        await cart.save();

        res.status(200).json({message: "Product deleted from cart successfully.", cart})

    } catch (error){
        res.status(400).json(error.message)
    }
}

//get cart
export const getCartContents = async (req,res) => {
    try{
        const {userId} = req.body;
        let page = req.query.page;
        let pageLimit = req.query.limit
        const cart = await Cart.findOne({userId})
        .populate('userId', 'username email firstName lastName')
        .populate('items.productId', 'title price productPicUrl')
        .skip((page-1)*pageLimit)
        .limit(pageLimit);

        if (!cart) {
            return res.status(404).json({message: "Cart doesn't exist for the user."})
        }
        
        res.status(200).json(cart);

    } catch (error){
        res.status(500).json(error.message);
    }
}