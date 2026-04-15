import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js"
import itemRoutes from "./routes/item.route.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/users",authRoutes);
app.use("/api/user/item",itemRoutes);
const PORT = process.env.PORT || 4000;


app.listen(PORT,async ()=>{
    console.log(`App running on Port ${process.env.PORT}`)
    await connectDB()
})