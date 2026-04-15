import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js"
import itemRoutes from "./routes/item.route.js";
const app = express();


app.use(express.json());
app.use("/api/users",authRoutes);
app.use("/api/user/item",itemRoutes);

app.listen(process.env.PORT,async ()=>{
    console.log(`App running on Port ${process.env.PORT}`)
    await connectDB()
})