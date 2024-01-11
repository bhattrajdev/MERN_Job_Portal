import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showModal, setShowModal] = React.useState(true);
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

 const onSubmit = (data, e) => {
   console.log(data);
   // Your form submission logic here

   // Reset the form data
   e.target.reset();

   // Alternatively, you can use the reset function from react-hook-form
   // reset();

   setShowModal(false);
 };


  useEffect(() => {
    fetchJobDetail();
  }, [_id]);

  return (
    <>
      {/* code for modal */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl flex justify-center font-semibold">
                    Job Application Form
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* for email */}
                    <div className="mb-3">
                      <label className="block text-base mb-2">
                        Email:
                        <ErrorMessage
                          errors={errors}
                          name="email"
                          render={({ message }) => (
                            <span className="text-red-500 pl-2">{message}</span>
                          )}
                        />
                        <input
                          type="text"
                          {...register("email", {
                            required: "Email is Required !!!",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Invalid Email !!!",
                            },
                          })}
                          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                        />
                      </label>
                    </div>

                    {/* for contact number */}
                    <div className="mb-3">
                      <label className="block text-base mb-2">
                        Contact Number:
                        <ErrorMessage
                          errors={errors}
                          name="contact"
                          render={({ message }) => (
                            <span className="text-red-500 pl-2">{message}</span>
                          )}
                        />
                      </label>
                      <input
                        type="text"
                        {...register("contact", {
                          required: "Contact is Required !!!",
                          pattern: {
                            value:
                              /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                            message: "Invalid Contact !!!",
                          },
                        })}
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* for cover letter */}
                    <div className="mb-3">
                      <label className="block text-base mb-2">
                        Cover Letter:
                      </label>
                      <textarea
                        type="text"
                        rows={5}
                        {...register("coverLetter")}
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* for resume */}
                    <div className="mb-3">
                      <label className="block text-base mb-2">
                        Upload Resume :
                        <ErrorMessage
                          errors={errors}
                          name="resume"
                          render={({ message }) => (
                            <span className="text-red-500 pl-2">{message}</span>
                          )}
                        />
                        {/*  */}
                      </label>
                      <input
                        type="file"
                        {...register("resume", {
                          required: "Resume is Required !!!",
                          validate: (value) => {
                            const acceptedFormats = ["pdf", "docx", "doc"];
                            const fileExtension = value[0]?.name
                              .split(".")
                              .pop()
                              .toLowerCase();
                            if (!acceptedFormats.includes(fileExtension)) {
                              return "Invalid file format !!!";
                            }
                            return true;
                          },
                        })}
                        accept=".pdf,.doc,.docx"
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mt-6 flex gap-3 justify-end">
                      <button
                        type="button"
                        className="text-base bg-red-600 p-2 rounded-sm text-white"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="text-base bg-blue  p-2 rounded-sm text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                {/* footer */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* for the main job detail page */}
      {data ? (
        <>
          <div className="container mx-auto px-20 py-12 grid grid-cols-1 md:grid-cols-4  gap-8">
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
                <button
                  className="mt-4 bg-blue opacity-95 p-2 rounded-md font-bold text-white"
                  onClick={() => setShowModal(true)}
                >
                  Apply Now
                </button>
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
