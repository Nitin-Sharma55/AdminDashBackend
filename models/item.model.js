import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    soldQuantity:{
        type:Number,
        required:true,
        default:0,
    },
     defectiveQuantity:{
        type:Number,
        required:true,
        default:0,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        index:true,
    }
},{
    timestamps:true,
})

const Item = mongoose.model("Item",itemSchema);
export default Item;

 // },
    // status:{
    //     type:String,
    //     enum:["available","sold","defective"],
    //     default:"available"
    // }