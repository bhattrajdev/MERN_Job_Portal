import {
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getJobs,
  getMyJobs,
} from "../controllers/jobController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

/*
PARENT ROUTE /job
*/

// ROUTES RELATED TO JOB

router.route("/").post(protect, createJob).get(getJobs);
router
  .route("/:id")
  .get(getJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

router.route("/myjob/:id").get(protect, getMyJobs);

export default router;
