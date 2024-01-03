import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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

const JobDetail = () => {
  const [data, setData] = useState(null);
  const { _id } = useParams();
  const [isCopied, setIsCopied] = useState(false);
  const fetchJobDetail = async () => {
    console.log(_id);
    try {
      const response = await axios.get(`http://localhost:5151/job/${_id}`);

      setData(response.data.job);
      console.log("Data found:", response.data.job);
    } catch (error) {
      console.error(`Error fetching job details: ${error.message}`);
    }
  };

  const handleCopy = async () => {
    const link = `http://localhost:5173/jobdetails/${_id}`;
    await navigator.clipboard.writeText(link);
    setIsCopied(true);
  };

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

  const applyNowHandler =()=>{
    console.log('This is the apply now handler')
  }

  useEffect(() => {
    fetchJobDetail();
  }, [_id]);

  return (
    <>
      {data ? (
        <>
          <div className="container mx-auto px-20 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-3">
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

            {/* ARE YOU INTERSTED IN THIS JOB SIDE */}
            <div className="md:col-span-1 ">
              <div className="bg-[#FAFAFA] flex flex-col p-6 rounded-md shadow-md">
                <div className="font-bold">
                  {" "}
                  Are you interested in this job?
                </div>
                <span className="mt-4">Application ends:</span>
                <p className="font-bold"> {data.expiryDate}</p>
                <button className="mt-4 bg-blue p-2 rounded-md font-bold text-white" onClick={applyNowHandler}>Apply Now</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default JobDetail;
