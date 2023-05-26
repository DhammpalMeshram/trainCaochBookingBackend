import User from "../modules/user.js"; 

export const signUpController = async (req, res)=>{
    try{

        const existEmail = await User.findOne({email: req.body.email});
        const existNumber = await User.findOne({mobileNumber: req.body.mobileNumber});
        console.log(existEmail);
        console.log(existNumber);

        if(existEmail) 
            return res.status(401).json({message: "account with email already exist"})
        
        if(existNumber) 
            return res.status(401).json({message: "account with mobile number already exist"})

        const user = req.body;
        const newUser = new User(user);
        await newUser.save();

        res.status(201).json({user, message:"Sign up Successfull"});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


export const signInController = async (req, res)=>{
    try{
        const userCheckViaEmail = await User.findOne({email: req.body.username});
        const userCheckViaNumber = await User.findOne({mobileNumber: req.body.username});

        // console.log(userCheckViaEmail);
        // console.log(userCheckViaNumber);
        
        if(!userCheckViaEmail && !userCheckViaNumber){
            res.status(401).json({message:"You don't have an account. Plese sign in first"});
        }
        else{
            if(userCheckViaEmail && userCheckViaEmail.password === req.body.password){
                res.status(200).json({username:userCheckViaEmail.username, message:"log in successfull"});
            }
                
            else if (userCheckViaNumber && userCheckViaNumber.password === req.body.password){
                res.status(200).json({username:userCheckViaNumber.username, message:"log in successfull"});
            }
            else
                res.status(401).json({message:"Incorrect Password"});
        }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

