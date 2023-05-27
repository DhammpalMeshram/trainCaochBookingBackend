import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {checkDataAvailability} from "./defaultData.js";
import router from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";


dotenv.config();
const app = express();

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use("", router);

//function to connect database cloud
const dataBaseConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log("Database is connected successfully");
        checkDataAvailability();
        // bookTicketsData(4,"20230527");
    }
    catch(err){
        console.log(err.message);
    }
}

dataBaseConnect();

app.listen(process.env.PORT, ()=>{
    console.log("server is running at port "+process.env.PORT);
})



