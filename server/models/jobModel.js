import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    minimumSalary: {
      type: Number,
      required: true,
    },
    maximumSalary: {
      type: Number,
      required: true,
    },
    salaryType: {
      type: String,
      enum: ["Hourly", "Monthly", "Yearly"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Any experience", "Internship", "Work remotely"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    postedOn: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    requiredSkill: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["Full Time", "Part Time", "Temporary"],
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobPostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Job = mongoose.model("Jobs", jobSchema);
export default Job;
