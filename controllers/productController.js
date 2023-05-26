import Product from "../modules/product"

export const getAllProducts = async (req, res)=>{
    try{
        let products = await Product.find({}); 
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message:err.message});

    }
}