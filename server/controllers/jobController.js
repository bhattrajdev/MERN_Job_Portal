import express from "express";
import Job from "../models/jobModel.js";

// FOR CREATING A NEW JOB
const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      minimumSalary,
      maximumSalary,
      salaryType,
      location,
      postedOn,
      expiryDate,
      requiredSkill,
      companyLogo,
      employmentType,
      experienceLevel,
      jobDescription,
      jobPostedBy,
    } = req.body;

    const job = await Job.create({
      title,
      companyName,
      minimumSalary,
      maximumSalary,
      salaryType,
      location,
      postedOn,
      expiryDate,
      requiredSkill,
      companyLogo,
      employmentType,
      experienceLevel,
      jobDescription,
      jobPostedBy,
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
    res.json({ jobs });
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

    const job = await Job.findById(id);

    if (job) {
      job.title = req.body.title;
      job.companyName = req.body.companyName;
      job.minimumSalary = req.body.minimumSalary;
      job.maximumSalary = req.body.maximumSalary;
      job.salaryType = req.body.salaryType;
      job.location = req.body.location;
      job.postedOn = req.body.postedOn;
      job.expiryDate = req.body.expiryDate;
      job.requiredSkill = req.body.requiredSkill;
      job.companyLogo = req.body.companyLogo;
      job.employmentType = req.body.employmentType;
      job.jobDescription = req.body.jobDescription;
      job.jobPostedBy = req.body.jobPostedBy;
      job.experienceLevel = req.body.experienceLevel;

      const updatedJob = await job.save();

      res.json({ updatedJob });
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
      res.json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    console.error("Error deleting job:", error.message);
    res.status(500).json({ error: "Error while deleting the Job" });
  }
};

export { createJob, getJob, getJobs, deleteJob, updateJob };
