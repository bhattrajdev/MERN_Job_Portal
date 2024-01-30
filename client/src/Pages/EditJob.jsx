import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import "react-quill/dist/quill.snow.css";
import api from "../config/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [selectedOption, setSelectedOption] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchJobDetails = async () => {
    try {
      const response = await api.get(`/job/${id}`);
      const fetchedJobDetails = response.data;
      setJobDetails(fetchedJobDetails.job);

      if (
        fetchedJobDetails.job.requiredSkill &&
        typeof fetchedJobDetails.job.requiredSkill === "string" &&
        fetchedJobDetails.job.requiredSkill.trim() !== ""
      ) {
        // Split the requiredSkill string into an array
        const requiredSkillsArray = fetchedJobDetails.job.requiredSkill
          .split(",")
          .map((skill) => skill.trim());

        // Map the requiredSkill values to match the structure of options
        const selectedOptions = requiredSkillsArray.map((skill) => ({
          value: skill,
          label: skill,
        }));

        setSelectedOption(selectedOptions);
      } else {
        console.log("No valid requiredSkill found.");
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
    console.log(selectedOption);
  }, []);

  const onSubmit = async (data, e) => {

    const selectedOptionsFiltered = selectedOption
      .map((data) => data.value)
      .join(", ");

    console.log(selectedOptionsFiltered);
    try {
      const response = await api.put(
        `/job/${id}`,
        {
          companyLogo: data.companyLogo,
          companyName: data.companyName,
          employmentType: data.employmentType,
          experienceLevel: data.experienceLevel,
          expiryDate: data.expiryDate,
          jobDescription: data.jobDescription,
          location: data.location,
          maximumSalary: data.maximumSalary,
          minimumSalary: data.minimumSalary,
          salaryType: data.salaryType,
          requiredSkill: selectedOptionsFiltered,
          title: data.title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Job Upadated successfully");

        navigate(`/my-job`);
      }

      if (response.status === 404) {
        toast.error("Job Not Found");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("Error Updating the job");
    }
  };

 const programmingLanguages = [
   "Python",
   "Ruby",
   "PHP",
   "Swift",
   "TypeScript",
   "Angular",
   "Vue.js",
   "Node.js",
   "Django",
   "Flask",
   "Spring",
   "Express.js",
   "Laravel",
   "Bootstrap",
   "jQuery",
   "Ruby on Rails",
   "Vue.js",
   "Sass",
   "LESS",
   "Go",
   "Rust",
   "Haskell",
   "Kotlin",
 ];
  const options = programmingLanguages.map((language) => ({
    value: language,
    label: language,
  }));

  if (!jobDetails) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* form  */}
      <div className="bg-[#fafafa] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* first row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Job Title :
                {errors.title && (
                  <span className="text-red-500 pl-2">
                    Job title is required
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder="Eg: Web Developer "
                defaultValue={jobDetails.title}
                {...register("title", {
                  required: true,
                })}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Company Name :
                {errors.companyName && (
                  <span className="text-red-500 pl-2">
                    Company name is required
                  </span>
                )}
              </label>
              <input
                type="text"
                defaultValue={jobDetails.companyName}
                placeholder={"Ex: Microsoft"}
                {...register("companyName", {
                  required: true,
                })}
                className="create-job-input"
              />
            </div>
          </div>

          {/* second row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Minimum Salary :
                {errors.minimumSalary && (
                  <span className="text-red-500 pl-2">
                    Minimum salary is required
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder={"$20k"}
                defaultValue={jobDetails.minimumSalary}
                {...register("minimumSalary", {
                  required: true,
                })}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Maximum Salary :
                {errors.maximumSalary && (
                  <span className="text-red-500 pl-2">
                    Maximum salary is required
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder={"$120k"}
                defaultValue={jobDetails.maximumSalary}
                {...register("maximumSalary", {
                  required: true,
                })}
                className="create-job-input"
              />
            </div>
          </div>

          {/* third row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Salary Type :
                {errors.salaryType && (
                  <span className="text-red-500 pl-2">
                    Salary Type is required
                  </span>
                )}
              </label>
              <select
                {...register("salaryType", {
                  required: true,
                })}
                value={jobDetails.salaryType}
                className="create-job-input"
              >
                <option value="">Choose your salary type</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Job Location :
                {errors.location && (
                  <span className="text-red-500 pl-2">
                    Job Location is required
                  </span>
                )}
              </label>
              <input
                type="text"
                defaultValue={jobDetails.location}
                placeholder={"Ex: New York"}
                {...register("location", {
                  required: true,
                })}
                className="create-job-input"
              />
            </div>
          </div>

          {/* fourth row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Expiry Date :
                {errors.expirydate && (
                  <span className="text-red-500 pl-2">
                    Expiry Date is required
                  </span>
                )}
              </label>
              <input
                type="date"
                defaultValue={jobDetails.expiryDate}
                placeholder="2023-11-03"
                {...register("expiryDate", {
                  required: true,
                })}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Experience Level :
                {errors.experienceLevel && (
                  <span className="text-red-500 pl-2">
                    Experience Level is required
                  </span>
                )}
              </label>
              <select
                {...register("experienceLevel", {
                  required: true,
                })}
                value={jobDetails.experienceLevel}
                className="create-job-input"
              >
                <option value="">Choose your salary type</option>
                <option value="Any experience">Any experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/* fifth row */}
          <div>
            <label className="block mb-2 text-lg">Required skill sets</label>
            <CreatableSelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* sixth row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Company Logo :
                {errors.companyLogo && (
                  <span className="text-red-500 pl-2">
                    Company Logo is required
                  </span>
                )}
              </label>
              <input
                type="url"
                defaultValue={jobDetails.companyLogo}
                placeholder="Paste your company logo URL"
                {...register("companyLogo", {
                  required: true,
                })}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Employment Type :
                {errors.employmentType && (
                  <span className="text-red-500 pl-2">
                    Employment Type is required
                  </span>
                )}
              </label>
              <select
                {...register("employmentType", {
                  required: true,
                })}
                value={jobDetails.employmentType}
                className="create-job-input"
              >
                <option value="">Choose your salary type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* seventh row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">
              Job Description :
              {errors.description && (
                <span className="text-red-500 pl-2">
                  Job Description is required
                </span>
              )}
            </label>
            <textarea
              defaultValue={jobDetails.jobDescription}
              {...register("jobDescription", {
                required: true,
              })}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              placeholder="Job Description"
            />
          </div>

          {/* last row */}
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer ml-auto"
          />
        </form>
      </div>
    </div>
  );
};

export default EditJob;
