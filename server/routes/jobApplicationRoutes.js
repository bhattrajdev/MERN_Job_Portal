import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";
import {fileUpload} from "../config/FileUpload.js";
import {
  getJobApplication,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
  getAllJobApplications,
  findMyRequests,
  myJobHistory,
} from "../controllers/jobApplicationController.js";

const router = express.Router();

const upload = fileUpload();

router
  .route("/")
  .post(protect, upload.single("resume"), createJobApplication)
  .get(protect, getAllJobApplications);

router
  .route(`/:id`)
  .get(protect, getJobApplication)
  .put(protect, upload.single("resume"), updateJobApplication)
  .delete(protect, deleteJobApplication);

router.route('/myjobhistory/:id').get(protect,myJobHistory)

router.route('/requests/:id').get(findMyRequests)
export default router;
