import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {jobRoutes,userRoutes} from "./routes/index.js"

import connectDB from './config/db.js'
import mongoose from "mongoose";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
connectDB();



// FOR ALL USER ROUTES
app.use("/user", userRoutes);

// FOR ALL JOB ROUTES
app.use("/job",jobRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`server running  on port ${PORT}`));

