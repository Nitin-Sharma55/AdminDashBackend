import express from "express";
import {registration,login,me} from "../controllers/user.contoller.js";
import auth from "../middlewear/auth.js"

const router = express.Router();


router.post("/register",registration)
router.post("/login",login)
router.get("/me",auth,me)

export default router;