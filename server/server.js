import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {jobRoutes,userRoutes,authRoutes} from "./routes/index.js"
import cookieParser from "cookie-parser";

import connectDB from './config/db.js'


const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(cors());
connectDB();





// FOR ALL USER ROUTES
app.use("/user", userRoutes);

// FOR ALL JOB ROUTES
app.use("/job",jobRoutes);

// FOR ALL THE AUTH ROUTES
app.use("/auth",authRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server running  on port ${PORT}`));

