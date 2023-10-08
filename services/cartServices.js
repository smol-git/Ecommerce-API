import Product from "../model/productModel.js"
import Cart from "../model/cartModel.js"

export const addToCartData = async(req)=>{
    const {productId, quantity} = req.body;

    const productAddedToCart = await Product.findById(productId);
   

    const checkCart = await Cart.findOne({productId})
    if(checkCart){
        checkCart.quantity += 1;
        await checkCart.save();
    }
    else{
        const cart = new Cart({
            productId: productId,
            quantity: quantity
        })
        await cart.save();
    }
    return productAddedToCart;
}