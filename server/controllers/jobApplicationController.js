import jwt from "jsonwebtoken";
import JobApplication from "../models/jobApplication.js";
import mongoose from "mongoose";
import { deleteFile } from "../config/FileUpload.js";

// FOR GET JOB APPLICATION
const getJobApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);
    res.json({ jobApplication }).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// FOR GET ALL JOB APPLICATIONS
const getAllJobApplications = async (req, res) => {
  try {
    const allJobApplications = await JobApplication.find();
    res.status(200).json({ jobApplications: allJobApplications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// FOR CREATE JOB APPLICATION
const createJobApplication = async (req, res) => {
  try {
    const existingJobApplications = await JobApplication.find({
      userId: req.body.userId,
      jobId: req.body.jobId,
    });
    if (existingJobApplications.length > 0) {
      res.status(403).json({ error: "You have already applied for this job" });
    } else {
      let resume = "";
      if (req.file) {
        resume = req.file.filename;
      }

      const newJobApplication = await JobApplication.create({
        ...req.body,
        resume,
      });

      res.status(201).json(newJobApplication);
    }
  } catch (error) {
    console.error("Error creating job application:", error);
    res.status(500).json({
      error:
        "Internal Server Error. Please check the server logs for more details.",
    });
  }
};


// FOR UPADATE JOB APPLICATION
const updateJobApplication = async (req, res) => {
  try {
    const existingJobApplication = await JobApplication.findById(req.params.id);
    if (!existingJobApplication) {
      return res.status(404).json({ error: "Job Application not found" });
    }
    let newResume = existingJobApplication.resume;
    if (req.file) {
      newResume = req.file.filename;
      if (existingJobApplication.resume) {
        const resumePath = `public/${existingJobApplication.resume}`;
        deleteFile(resumePath);
      }
    }
    const updatedJobApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        resume: newResume,
      },
      { new: true }
    );

    res.status(200).json({ jobApplication: updatedJobApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// FOR DELETE JOB APPLICATION
const deleteJobApplication = async (req, res) => {
  try {
    const deletedJobApplication = await JobApplication.findByIdAndDelete(
      req.params.id
    );

    if (!deletedJobApplication) {
      return res.status(404).json({ error: "Job Application not found" });
    }
    const resumePath = `public/${deletedJobApplication.resume}`;
    deleteFile(resumePath);

    res.status(200).json({ message: "Job Application deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// FOR FIND MY REQUESTS
const findMyRequests = async (req, res) => {
  try {
    const jobApplication = await JobApplication.find({ jobId: req.params.id }).populate("userId");;
    res.status(200).json({ jobApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// FOR USERS JOB HISTORY
const myJobHistory = async (req, res) => {
  try {
    const myJobHistory = await JobApplication.find({
      userId: req.params.id,
    }).populate("jobId");

    res.status(200).json({ myJobHistory });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};




export {
  getJobApplication,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication,
  getAllJobApplications,
  findMyRequests,
  myJobHistory,
};
