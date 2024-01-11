
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

// ROUTES RELATED TO JOB

router.route("/").post(protect, createJob).get(getJobs);


export default router;
