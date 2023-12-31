import mongoose, { mongo } from "mongoose";

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
      enum: ["Any expericence", "Internship", "Work remotely"],
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
      type: Array,
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
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Job = mongoose.model("Jobs", jobSchema);
export default Job;
