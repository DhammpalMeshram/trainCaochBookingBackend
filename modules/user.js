import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String, 
        required: true
    },
    lastName :{
        type:String, 
        required: true
    },
    email : {
        type:String, 
        required: true, 
        lowercase: true, 
        unique: true
    },
    mobileNumber : {
        type:String, 
        required: true, 
        unique: true
    },
    username : {
        type:String, 
        required: true, 
        lowercase: true, 
    },
    password : {
        type:String, 
        required: true
    },
})

//Creating Collection
const User = mongoose.model("user", userSchema);
export default User;
