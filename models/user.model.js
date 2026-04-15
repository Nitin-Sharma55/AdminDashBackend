import mongoose from "mongoose";
import { hashPassword } from "../utils/bcrypt.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) next();
    this.password = await hashPassword(this.password);
   
})

userSchema.methods.matchPassword= async function(enteredPass){
   return await bcrypt.compare(enteredPass,this.password);
}

 const User =  mongoose.model("User",userSchema);
 export default User;