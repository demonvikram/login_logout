const User=require("../models/user")
const Login=require("../models/loginModel")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

//created the new user
const createUser = async (req, res) => {
    try {
        let { username, firstname,lastname,age,email,password } = req.body;

        //hash the password
        const newPassword=await bcrypt.hash(password,10)
        
        //if hashing gets failed
        if(!newPassword){
            return res.status(500).json({
                message:"failed to encrypt the password"
            })
        }

        password=newPassword
        
        //finally make entry in database
        const newUser = new User({ username, firstname,lastname,age,email,password });
        await newUser.save();

        return res.status(200).json({
            message: "Successfully created a new user",
        });

    } catch (err) {
        console.error("Error creating user:", err);

        if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
            // Duplicate key error for the username field
            return res.status(400).json({
                message: "Username is already taken",
            });
        }

        return res.status(500).json({
            message: "Failed to create user",
            error: err.message,
        });
    }
};


//get all users
const allUserInfo = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            message: "success",
            users: users, 
        });
    } catch (error) {
        console.error("Error fetching user information:", error);

        return res.status(500).json({
            message: "Failed to retrieve user information",
            error: error.message,
        });
    }
};


//delete any user
const removeCustomer=async(req,res)=>{
    try {
        const {usrname , mail}=req.body
        
        //find does user exist
        const user=await User.findOne({username:usrname})
        console.log(user)
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        //if user exist
        await User.findOneAndDelete({username:usrname})
        await Login.deleteOne({
            email:mail
        })
        return res.status(200).json({
            message:"successfully deleted"
        })

    } catch (error) {
        return res.status(500).json({
            message:"failed to delete user",
            error:error.message,
        })
    }
}

module.exports={createUser , allUserInfo , removeCustomer}