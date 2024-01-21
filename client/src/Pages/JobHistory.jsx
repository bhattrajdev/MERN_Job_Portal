import React from "react";
import api from "../config/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const JobHistory = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [jobHistory, setJobHistory] = useState([]);
  const [data, setData] = useState([]);
  const [jobApplicationId, setJobApplicationId] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("Id");

  // TO FETCH MY JOB HISTORY
  const fetchJobHistory = async () => {
    try {
      const response = await api.get(`/jobApplication/myjobhistory/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setJobHistory(response.data.myJobHistory);
    } catch (error) {
      console.error(`Error fetching job details: ${error.message}`);
    }
  };

  // CODE FOR DELETE HANDLER
  const deleteHandler = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/jobApplication/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        toast.success("Job deleted successfully");
        fetchJobHistory();
      } else {
        toast.error("Job failed to delete");
      }
    } catch (error) {
      console.error(`Error Deleting: ${error.message}`);
    }
  };

  // CODE FOR EDIT HANDLER
  const editHandler = async (id) => {
    setJobApplicationId(id);
    const response = await api.get(`/jobApplication/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.jobApplication);
    console.log(response.data.jobApplication);
    setShowModal(true);
  };

  // CODE FOR EDIT SUBMIT HANDLER
  const onSubmit = async (data, e) => {
    console.log(`The job application id is ${jobApplicationId}`);
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("contact", data.contact);
      formData.append("cv", data.cv);
      formData.append("resume", data.resume[0]);

      const response = await api.put(
        `/jobApplication/${jobApplicationId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(`response is ${response}`);

      if (response.status === 200) {
        toast.success("Job Updated successfully");
        setShowModal(false);
        e.target.reset();
      } else {
        toast.error("Error posting the job");
      }
    } catch (error) {
      // Other errors (e.g., network error)
      console.log(`Error: ${error.message}`);
      toast.error("An error occurred while posting the job");
    }
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
  useEffect(() => {
    fetchJobHistory();
  }, []);

  return (
    <>
      <ToastContainer />
      {/* code for modal start */}

      {showModal && data ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl flex justify-center font-semibold">
                    Update Job Application
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
                  <form
                    onSubmit={handleSubmit(onSubmit, data.id)}
                    encType="multipart/form-data"
                  >
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
                          defaultValue={data.email}
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
                        defaultValue={data.contact}
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
                        {...register("cv")}
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                        defaultValue={data.cv}
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
                      </label>
                      <input
                        type="file"
                        {...register("resume", {
                          validate: (value) => {
                            if (value.length === 0) {
                              // File is optional, no validation needed
                              return true;
                            }

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

      {/* code for modal end */}

      <div className="container mx-auto px-20 py-12">
        <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="create-table-border">S.N.</th>
                <th className="create-table-border">Logo</th>
                <th className="create-table-border">Company Name</th>
                <th className="create-table-border">Position</th>
                <th className="create-table-border">Applied on</th>
                <th className="create-table-border">Status</th>
                <th className="create-table-border">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobHistory
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((job, index) => (
                  <tr key={job._id}>
                    <td className="create-table-border">{index + 1}</td>
                    <td className="create-table-border">
                      <img
                        src={job.jobId.companyLogo}
                        alt="Job Image"
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="create-table-border">
                      {job.jobId.companyName}
                    </td>
                    <td className="create-table-border">{job.jobId.title}</td>
                    <td className="create-table-border">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="create-table-border">
                      <span
                        className={`font-semibold ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                      <button
                        onClick={() => navigate(`/jobdetails/${job.jobId._id}`)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>
                      {job.status == "Pending" ? (
                        <>
                          <button
                            onClick={() => editHandler(job._id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => {
                              const confirmCheck = confirm(
                                "Are you sure want to delete this Job?"
                              );
                              if (confirmCheck) {
                                deleteHandler(job._id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </>
                      ) : null}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default JobHistory;
