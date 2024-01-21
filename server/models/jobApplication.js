import mongoose from "mongoose";

const jobApplicationSchema = mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      required: true,
      default:"Pending"
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
