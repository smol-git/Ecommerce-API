import createProductData, { getAllProductsData, getSingleProductData, updateSingleProductData, deleteSingleProductData } from "../services/productServices.js";

//create new product function
export const createProduct = async(req,res) => {
    try{
        const newProduct = await createProductData(req)
        res.status(200).json(newProduct)
    }catch(error){
        res.status(400).json({message: error.message})
    }
};

//get all user function
export const getAllProducts = async (res) => {
try{
        const products = await getAllProductsData();
        if(products){
            res.status(200).json(products)
        }
    } catch (error){
            res.status(500).json({message: error.message})
    }
};

//get single user by there specific data 
export const getSingleProduct = async(req, res) => {
    try {
        const products = await getSingleProductData(req);
        if(products){
            res.status(200).json(products)
        }

    } catch (error){
            res.status(400).json({message:error.message})
    }
};

// //update single user by id
export const updateSingleProduct = async(req, res) => {
    try {
       const products = await updateSingleProductData(req);
        if(products){
            res.status(200).json(products)
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

//delete single user by id
export const deleteSingleProduct = async(req, res) => {
    try {
        const products = await deleteSingleProductData(req)
        if (products){
            res.status(200).json({message: "Successfully deleted Product"})
        }
    } catch (error){
        res.status(400).json({message: error.message})
    }
};