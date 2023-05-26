import Product from "./modules/product.js";
import { products } from "./constants/Data.js";

// const Product = require("./modules/product.js");
// const {products} = require("./constants/Data.js");


const defaultData = async ()=>{
    try{
        await Product.insertMany(products);
        console.log("Data inserted Successfully");
    }
    catch(err){
        console.log("Error while inserting default Data "+err.message);
    }
}

export {defaultData};