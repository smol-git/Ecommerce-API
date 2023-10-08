import { addToCartData } from "../services/cartServices.js";

export const addToCart = async(req,res) => {
    try{
        const productAdded = await addToCartData(req);
        if(!productAdded){
            res.status(400).json({message: "product out of stock"})
        }else{
            res.status(200).json(productAdded);
        }
      
    }catch(error){
        res.status(400).json({message: error.message});
    }
    
}