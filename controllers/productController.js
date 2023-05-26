import Product from "../modules/product.js"

export const getAllProducts = async (req, res)=>{
    try{
        let products = await Product.find({}); 
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export const getProductById = async(req, res)=>{
    try{
        const id = req.params.id;
        const product = await Product.findOne({"id":id});
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}