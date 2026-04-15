import asyncHandler from "../utils/asynchandler.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken";

const generateToken =(id)=>{
   return jwt.sign({id},
    process.env.JWT_SECRET
   ,{
    expiresIn:"7d",
   })
}




export const registration = asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;

   const exist = await User.findOne({email});
   if(exist){
    return res.status(400).json({
        message:"User already exist",
    })
   }
   
   const user = await User.create({username,email,password});

   const token = generateToken(user._id);
   res.status(200).json({
    id:user._id,
    username:user.username,
    email:user.email,
    token
   })
   
})

export const login = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
   if(!user){
    return res.status(400).json({
        message:"Register before login",
    })
   }
    const token = generateToken(user._id);
   res.status(200).json({
    id:user._id,
    username:user.username,
    email:user.email,
    token,
   })

})

export const me=asyncHandler(async(req,res)=>{
       res.status(200).json(req.user);
}) 