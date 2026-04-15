import express from "express";
import {addItem,getItem,updateItem,totalItem} from "../controllers/item.controller.js";
import auth from "../middlewear/auth.js";

const router = express.Router();

router.post("/addItem",auth,addItem);
router.post("/updateItem",auth,updateItem);
router.get("/totalItem",auth,totalItem);
router.get("/",auth,getItem)

export default router;