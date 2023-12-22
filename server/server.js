import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from './config/db.js'
import mongoose from "mongoose";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
// connectDB();

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    if (conn) {
      console.log(`mongo db connected ${conn.connection.host}`);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }


// for all the user routes
app.use("/user", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server running  on port ${PORT}`));

