const asyncHandler =  require('express-async-handler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
//@desc Register all contacts
//@route POST /api/register
//@access public
const registerUsers = asyncHandler(async (req,resp)=>{
    const {username , email ,password} = req.body;
    if(!username||!email||!password){
        resp.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        resp.status(400);
        throw new Error("User already registered");

    };
    const hashedPassword = await bcrypt.hash(password , 10);
    console.log("Hashed Password:",hashedPassword); 
    const user = await User.create({
        username , 
        email ,
        password:hashedPassword 
    })
    console.log(`user created ${user}`)
    if(user){
        resp.status(201).json({_id:user.id , email:user.email});
    }
    resp.json({message:"Register the user"});
});

//@desc Login contacts
//@route POST /api/login
//@access private
const loginUsers = asyncHandler(async (req,resp)=>{
    const {email ,password} = req.body;
    if(!email||!password){
        resp.status(400);
        throw new Error("All fields are mandatory")
    };
        const user = await User.findOne({email});
        //compare password with hashed password
        if(user && (await bcrypt.compare(password , user.password)) ){
            const accessToken = jwt.sign({
                user:{
                    username:user.username , 
                    email:user.email,
                    id:user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"},
            );
            resp.status(200).json({accessToken});
        }

        else{
            resp.status(401);
            throw new Error("password and email invalidd");
        }
    
    resp.json({message:"login the user"});
}
);

//@desc Current contacts
//@route GET /api/current
//@access private
const currentUsers = asyncHandler(async(req,resp)=>{
    resp.json(req.user);
});



module.exports = {registerUsers , loginUsers , currentUsers} ;
