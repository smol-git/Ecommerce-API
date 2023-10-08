import Product from "../model/productModel.js"

export default function createProductData(req){
    const {title,description,price,category} = req.body;
    // console.log({name,age,gender});

    // if (!name || !gender || !age){
    //     res.status(400).json({message:"All Fields are mandatory"})
    // }

    const newProduct = new Product({
        title: title,
        description: description,
        price: price,
        category: category
    })
    return newProduct.save()
}

export function getAllProductsData(){
    return Product.find()
}

export function getSingleProductData(req){
    const {title} = req.params;
    return Product.findOne({title:title});
}

export function updateSingleProductData(req){
    const {id} = req.params;
        return Product.findByIdAndUpdate(id, req.body,{
            new:true
        })
}

export function deleteSingleProductData(req){
    const {id} = req.params;
    return Product.findByIdAndDelete(id)
}