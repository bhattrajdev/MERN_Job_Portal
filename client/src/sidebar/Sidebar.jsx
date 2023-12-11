import React from "react";
import { useState } from "react";
import Location from "./Location";
import Salary from "./Salary";
import JobPostingData from "./JobPostingData";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";
import { IoFilterSharp, IoClose } from "react-icons/io5";

const Sidebar = ({ handleChange, handleClick }) => {
  const [filter, setFilter] = useState();

  const filterHandler = () => {
    setFilter(!filter);
  };

  return (
    <>
      {/* responsive filter start */}
      <div className="flex justify-end gap-1 text-xl ">
        <IoFilterSharp
          className="lg:hidden md:hidden cursor-pointer"
          onClick={filterHandler}
        />
      </div>

      {filter && (
        <>
          <div className="bg-white lg:hidden top-0 left-0 right-0 z-1 fixed h-screen overflow-auto">
            {/* close button */}
            <div className="flex justify-between shadow-md px-6 py-3 font-semibold">
              <p className="text-xl ">Filters</p>
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={filterHandler}
              />
            </div>
            <hr />

            {/* filters start */}
            <div className="px-6 py-2">
              <Location handleChange={handleChange} />
              <Salary handleChange={handleChange} handleClick={handleClick} />
              <JobPostingData handleChange={handleChange} />
              <WorkExperience handleChange={handleChange} />
              <EmploymentType handleChange={handleChange} />
            </div>
            {/* for filter button */}
            <div className="px-4 py-2 border text-base bg-blue flex justify-center ">
              <button
                onClick={filterHandler}
                className="text-center text-white font-semibold"
              >
                Filter
              </button>
            </div>
          </div>
        </>
      )}
      {/* responsive filter end */}

      {/* normal filter start */}
      <div className="space-y-5 hidden lg:block md:block ">
        <h3 className="text-lg font-bold mb-2">Filters</h3>
        <Location handleChange={handleChange} />
        <Salary handleChange={handleChange} handleClick={handleClick} />
        <JobPostingData handleChange={handleChange} />
        <WorkExperience handleChange={handleChange} />
        <EmploymentType handleChange={handleChange} />
      </div>
      {/* normal filter end */}
    </>
  );
};

export default Sidebar;
