import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiShare2,
  FiCopy,
} from "react-icons/fi";
import { IoIosGitNetwork } from "react-icons/io";
import { FaMoneyBill, FaSignal, FaComputer } from "react-icons/fa6";
import JobDetailCard from "../components/jobDetailCard";
import Loader from "../components/Loader";
import api from "../config/api";
import { FaDownload, FaFileExport } from "react-icons/fa6";

const MyJobDetail = () => {
  const [data, setData] = useState(null);
  const [jobApplication, setJobApplication] = useState([]);
  const { _id } = useParams();
  const [isCopied, setIsCopied] = useState(false);
  const token = localStorage.getItem('token')
  
  
  // TO FETCH JOB DETAILS
  const fetchJobDetail = async () => {
    try {
      const response = await api.get(`/job/${_id}`);
      setData(response.data.job);
      console.log("Data found:", response.data.job);
    } catch (error) {
      console.error(`Error fetching job details: ${error.message}`);
    }
  };


  // TO FETCH JOB APPLICATIONS
  const fetchJobApplication = async () => {
    try {
      const response = await api.get(`/jobApplication/requests/${_id}`);

      console.log(response);
      setJobApplication(response.data.jobApplication);
    } catch (error) {
      console.error(`Error fetching job details: ${error.message}`);
    }
  };
  
  
  // TO HANDLE COPY
  const handleCopy = async () => {
    const link = `http://localhost:5173/jobdetails/${_id}`;
    await navigator.clipboard.writeText(link);
    setIsCopied(true);
  };
  
  
  // TO HANDLE SHARE
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "title",
          text: "text",
          url: _id,
        });
        console.log("Link shared successfully!");
      } else {
        alert("Web Share API is not supported in this browser");
      }
    } catch (error) {
      console.error("Error sharing link", error);
    }
  };


  // TO HANDLE RESUME DOWNLOAD
  const handleDownloadResume = (resumeFileName) => {
    const link = document.createElement("a");
    link.href = `http://localhost:5151/${resumeFileName}`;
    link.download = resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  // COLOR FOR STATUS
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Accepted":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

// CODE FOR ACCEPT OR REJECT BUTTON
 const decisionHandler = async (decision,applicationId) => {
  console.log(`Decision : ${decision}`)
  console.log(`Application Id : ${applicationId}`);
   try {
     const response = await api.put(
       `/jobApplication/${applicationId}`,
       {
         status: decision,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
     console.log(response);
     fetchJobApplication();
   } catch (error) {
     console.error(`Error updating job application status: ${error.message}`);
   }
 };



  useEffect(() => {
    fetchJobDetail();
    fetchJobApplication();
  }, [_id]);

  return (
    <>
      {data ? (
        <>
          <div className="container mx-auto px-20 py-12 grid grid-cols-1 md:grid-cols-4  gap-8">
            <div className="col-span-4">
              {/* First box */}
              <div className="bg-[#FAFAFA] flex p-6 rounded-md shadow-md">
                <div className="flex justify-end items-center mb-4">
                  <div className="w-24 md:w-32">
                    <img src={data.companyLogo} alt="Company Logo" />
                  </div>
                  <div className="flex flex-col ml-8">
                    <h2 className="text-xl md:text-xl font-semibold capitalize mb-1">
                      {data.title}
                    </h2>
                    <h2 className="text-lg md:text-lg font-medium text-blue mb-1">
                      {data.companyName}
                    </h2>
                    <div className="flex gap-3 flex-col sm:flex-row">
                      <span className="flex items-center gap-2">
                        <FiMapPin /> {data.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <FiClock /> {data.employmentType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right-hand side div */}
                <div className="ml-auto mt-2 flex gap-4 text-lg md:text-xl">
                  <FiShare2
                    className="cursor-pointer hover:text-blue transition duration-300"
                    onClick={handleShare}
                  />
                  <FiCopy
                    className="cursor-pointer hover:text-blue transition duration-300"
                    onClick={handleCopy}
                  />
                  {isCopied && (
                    <p className="text-sm text-blue">Link Copied!</p>
                  )}
                </div>
              </div>

              {/* Second box */}
              <div className="mt-8 rounded-md shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Offered Salary */}
                  <JobDetailCard
                    icon={<FiDollarSign />}
                    text="Offered Salary"
                    data={`RS ${data.minimumSalary} - RS ${data.maximumSalary}`}
                  />
                  {/* Salary Type */}
                  <JobDetailCard
                    icon={<FaMoneyBill />}
                    text="Salary Type"
                    data={data.salaryType}
                  />
                  {/* for expericence level */}
                  <JobDetailCard
                    icon={<FaSignal />}
                    text="Experience Level"
                    data={data.experienceLevel}
                  />

                  {/* Employment Type */}
                  <JobDetailCard
                    icon={<IoIosGitNetwork />}
                    text="Employment Type"
                    data={data.employmentType}
                  />
                  {/* For required skills */}
                  <div className="flex gap-4 ">
                    <span className="rounded-md font-semibold bg-blue opacity-80 p-3 text-3xl text-white">
                      <FaComputer />
                    </span>
                    <div className="flex gap-1 flex-col">
                      <h4 className="font-semibold">Required Skills</h4>
                      <div className="flex flex-row">
                        {data.requiredSkill.map((item, index) => (
                          <div key={index} className="flex items-center mr-2">
                            <span className="bg-gray-200 p-1  rounded-lg ">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* for description */}
              <div className="bg-[#FAFAFA] p-6 mt-8 rounded-md shadow-md">
                <div className="font-semibold mb-2">Job Description: </div>
                <p>{data.jobDescription}</p>
              </div>
            </div>
          </div>

          {/* for job requests */}
          <div className="container mx-auto px-20 py-12">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl  font-bold mb-4">Application Requests</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="create-table-border">S.N.</th>
                    <th className="create-table-border">Email</th>
                    <th className="create-table-border">Contact</th>
                    <th className="create-table-border">Status</th>
                    <th className="create-table-border">Download</th>
                    <th className="create-table-border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobApplication.map((job, index) => (
                    <tr key={job._id}>
                      <td className="create-table-border">{index + 1}</td>
                      <td className="create-table-border">{job.email}</td>
                      <td className="create-table-border">{job.contact}</td>
                      <td
                        className={`create-table-border font-bold ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </td>

                      <td className="create-table-border">
                        <button
                          onClick={() => handleDownloadResume(job.resume)}
                          className="bg-orange-500  text-white px-3 py-1 rounded"
                        >
                          Download Resume
                        </button>
                      </td>

                      {job.status === "Pending" ? (
                        <td className="border border-gray-300 px-4 py-2 space-x-2">
                          <button
                            onClick={() => decisionHandler("Accepted", job._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => decisionHandler("Rejected", job._id)}
                          >
                            Reject
                          </button>
                        </td>
                      ) : job.status === "Accepted" ? (
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => decisionHandler("Rejected", job._id)}
                          >
                            Reject
                          </button>
                        </td>
                      ) : job.status === "Rejected" ? (
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            onClick={() => decisionHandler("Accepted", job._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Accept
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyJobDetail;
