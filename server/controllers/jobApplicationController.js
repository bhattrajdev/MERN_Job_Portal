import jwt from "jsonwebtoken";
import JobApplication from "../models/jobApplication";
import FileUploads from "../config/FileUpload";

const getJobApplication = async (req, res) => {
  try {
    const jobApplication = await jobApplication.findById(req.params.id);
    res.json({ jobApplication }).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createJobApplication = async (req, res) => {
  try {
    const jobApplication = await jobApplication.create({
      ...req.body,
    });
    res.status(201).json(jobApplication);
  } catch (error) {
    console.log(`error ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
