import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    console.log(data);
  };

  const options = [
    { value: "Python", label: "Python" },
    { value: "Ruby", label: "Ruby" },
    { value: "PHP", label: "PHP" },
    { value: "Swift", label: "Swift" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Node.js", label: "Node.js" },
    { value: "Django", label: "Django" },
    { value: "Flask", label: "Flask" },
    { value: "Spring", label: "Spring" },
    { value: "Express.js", label: "Express.js" },
    { value: "Laravel", label: "Laravel" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "jQuery", label: "jQuery" },
    { value: "Ruby on Rails", label: "Ruby on Rails" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Sass", label: "Sass" },
    { value: "LESS", label: "LESS" },
    { value: "Go", label: "Go" },
    { value: "Rust", label: "Rust" },
    { value: "Haskell", label: "Haskell" },
    { value: "Kotlin", label: "Kotlin" },
  ];

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
                {errors.jobTitle && (
                  <span className="text-red-500 pl-2">
                    Job title is required
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder="Eg: Web Developer "
                {...register("jobTitle", {
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
                {errors.minSalary && (
                  <span className="text-red-500 pl-2">
                    Minimum salary is required
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder={"$20k"}
                {...register("minSalary", {
                  required: true,
                })}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 2-full">
              <label className="block mb-2 text-lg">
                Maximum Salary :
                {errors.minSalary && (
                  <span className="text-red-500 pl-2">
                    Maximum salary is required
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder={"$120k"}
                {...register("maxSalary", {
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
                {errors.jobLocation && (
                  <span className="text-red-500 pl-2">
                    Job Location is required
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder={"Ex: New York"}
                {...register("jobLocation", {
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
                placeholder={"Ex: 2023-11-03"}
                {...register("expirydate", {
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
                className="create-job-input"
              >
                <option value="">Choose your salary type</option>
                <option value="Full-time">Full Time</option>
                <option value="Part-time">Part Time</option>
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
              {...register("description", {
                required: true,
              })}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              placeholder="Job Description"
            />
          </div>

          {/* last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By
            
            </label>
            <input
              type="email"
              placeholder="your email"
              {...register("postedBy", {
                required: true,
              })}
              className="create-job-input"
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer ml-auto"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
