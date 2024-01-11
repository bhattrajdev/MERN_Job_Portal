import mongoose from "mongoose";

const jobApplicationSchema = mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true
    },
    contact:{
      type:String,
      required:true
    },
    cv:{
      type:String,
      required:false
    }
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
