import Product from "../model/productModel.js"

//create new product function
export const createProduct = async(req,res) => {
    try{
        const {title, description, price, category, productPicUrl} = req.body;
        if (!title || !description || !price || !category){
            res.status(400).json({message:"Please fill all required fields."})
        }
        const newProduct = new Product({title,description,price,category,productPicUrl})
        await newProduct.save()
        
        res.status(201).json(newProduct)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

//get all user function
export const getAllProducts = async (req, res) => {
    try{
        let page = req.query.page;
        let pageLimit = req.query.limit;
        
        const products = await Product.find()
        .skip((page-1)*pageLimit)
        .limit(pageLimit);
        if(products){
            res.status(200).json(products);
        }
     
    } catch (error){
            res.status(400).json({message: error.message});
    }
};

//get single user by there specific data 
export const getSingleProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        if(product){
            res.status(200).json(product);
        }
    } catch (error){
            res.status(404).json({message: error.message});
    }
};

// //update single user by id
export const updateSingleProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body,{new:true});
        
        if(product){
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

//delete single user by id
export const deleteSingleProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (product){
            res.status(200).json({message: "Successfully deleted product"})
        }
    } catch (error){
        res.status(404).json({message: error.message})
    }
};