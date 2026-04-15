
import asyncHandler from "../utils/asynchandler.js";
import Item from "../models/item.model.js";




export const addItem= asyncHandler(async(req,res)=>{
     const {itemName,description,price,quantity,soldQuantity,defectiveQuantity}=req.body;
     const userId = req.user.id;

     if(!itemName || !description ||!price){
        return res.status(400).json({
            message:"Fill all the field",
        })
     }

     const item = await Item.create({
        itemName,
        description,
        price,
        quantity,
        soldQuantity,
        defectiveQuantity,
        user:userId,
     }) 
    res.status(200).json({
        message:"Item added Successfully",
        item,
    })
})

export const getItem=asyncHandler(async(req,res)=>{


    const userId = req.user.id;
    const {type} = req.query;

    // console.log("USER:", req.user);
    // console.log("USER ID:", req.user.id);

    let filter = {user:userId};
    // console.log("filter is ",filter);

    // if(status && status!="all"){  // if the user want all we won't filter
    //   filter.status=status;
    // }
    if(type==="sold"){
        filter.soldQuantity={
            $gt:0
        }
    }
   
     if (type === "defective") {
    filter.defectiveQuantity = { $gt: 0 };
  }
    const items = await Item.find(filter).sort({createdAt:-1});
    console.log(items);
    res.json({
        count:items.length,
        items,
    })
})

export const updateItem = asyncHandler(async(req,res)=>{
    const {description,price,quantity,status}=req.body;
    const itemId=req.params.id;
    const userId =req.user.id;


    const item = await Item.findById(itemId);

    if(!item){
        return res.status(400).json({
            message:"No item found"
        })
    }

    if (item.user.toString() !== userId) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

    if(description !== undefined) item.description=description;
    if(price !== undefined) item.price=price;
    if(quantity !== undefined) item.quantity=quantity;
    if(status !== undefined) item.status=status;
    

    const updatedItem = await item.save();

    res.status(200).json({
        message:"Items updated Successfully",
        item :updatedItem,
    })

})

export const totalItem=asyncHandler(async(req,res)=>{
    const totalItems = await Item.countDocuments();
    // console.log("total document are",totalItems);
    res.status(200).json({
        totalItems:totalItems,
    })
})