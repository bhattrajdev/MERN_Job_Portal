import express from "express";
import Job from "../models/jobModel.js";


// FOR CREATING A NEW JOB
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
     ...req.body
    });
    res.status(201).json({ job });
  } catch (error) {
    console.log(`error ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// FOR GETTING ALL THE JOBS 
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// FOR GETTING A JOB
const getJob = async (req, res) => {
  try {
    console.log(req.params.id);
    const job = await Job.findById(req.params.id);
    if (job) {
      res.status(200);
      res.json({ job });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Job Not Found");
  }
};

// FOR UPATING A JOB
const updateJob = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
    );

    if (updatedJob) {
      res.status(200).json({ updatedJob });
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    console.error("Error updating job:", error.message);
    res.status(500).json({ error: "Cannot update the job" });
  }
};


// FOR DELETING A JOB
const deleteJob = async (req, res) => {
  try {
    const jobToDelete = await Job.findById(req.params.id);
    if (jobToDelete) {
      await jobToDelete.deleteOne();
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    console.error("Error deleting job:", error.message);
    res.status(500).json({ error: "Error while deleting the Job" });
  }
};


// FOR GETTING JOBS UPLOADED BY THE USER
const getMyJobs = async (req, res) => {
  try {
    const userId = req.params.id;
    const jobs = await Job.find({ jobPostedBy: userId });

    if (jobs.length > 0) {
      res.status(200).json(jobs);
    } else {
      res.status(404).json({ message: "No Job Found" });
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export { createJob, getJob, getJobs, deleteJob, updateJob, getMyJobs };
