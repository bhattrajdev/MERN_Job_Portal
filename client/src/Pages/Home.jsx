import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
import axios from "axios";
import Loader from "../components/Loader";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [query, setQuery] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5151/job");
      setJobs(response.data.jobs);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching jobs: ${error.message}`);
      setIsLoading(false);
    }
  };

 

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = jobs.filter(
        (job) => job.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
const userId = localStorage.getItem("Id");

// If the user's ID is set, filter out jobs where jobPostedBy matches the user's ID
if (userId) {
  filteredJobs = filteredJobs.filter(
    ({ jobPostedBy }) => jobPostedBy !== userId
  );
}
    if (selected) {
  
      filteredJobs = filteredJobs.filter(
        ({
          location,
          maximumSalary,
          experienceLevel,
          salaryType,
          employmentType,
          postedOn,
          expiryDate,
        }) => {
          const selectedLowerCase = selected.toLowerCase();
          const isJobLocationMatch =
            location && location.toLowerCase() === selectedLowerCase;
          const isMaximumSalaryMatch =
            maximumSalary && maximumSalary === selectedLowerCase;
          const isSalaryTypeMatch =
            salaryType && salaryType.toLowerCase() === selectedLowerCase;
          const isEmploymentTypeMatch =
            employmentType &&
            employmentType.toLowerCase() === selectedLowerCase;
          const isExperienceLevelMatch =
            experienceLevel &&
            experienceLevel.toLowerCase() === selectedLowerCase;
          const isPostedOnMatch =
            postedOn && new Date(postedOn) >= new Date(selected);
          const isExpiryDateValid =
            expiryDate && new Date(expiryDate) >= new Date();

          // Filter conditions based on category only
          return (
            isJobLocationMatch ||
            isMaximumSalaryMatch ||
            isSalaryTypeMatch ||
            isEmploymentTypeMatch ||
            isExperienceLevelMatch ||
            isPostedOnMatch ||
            isExpiryDateValid
          );
        }
      );
    }

    // Sorting by Expiry Date
    filteredJobs.sort((a, b) => {
      const aDate = new Date(a.expiryDate);
      const bDate = new Date(b.expiryDate);
      return bDate - aDate;
    });



 useEffect(() => {
   fetchJobs();

   if(!userId){
    fetchJobs()
   }
 }, [userId]);

    return filteredJobs;
  };

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (
      currentPage <
      Math.ceil(
        filteredData(jobs, selectedCategory, query).length / itemsPerPage
      )
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const result = filteredData(jobs, selectedCategory, query);

  const { startIndex, endIndex } = calculatePageRange();
  const paginatedJobs = result.slice(startIndex, endIndex);

  return (
    <>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? (
            <Loader />
          ) : paginatedJobs.length > 0 ? (
            paginatedJobs.map((job, index) => <Card key={index} data={job} />)
          ) : (
            <>
              <h3 className="font-bold text-lg">{result.length} Jobs</h3>
              <div className="mt-2">No Data Found</div>
            </>
          )}

          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {Math.ceil(result.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(result.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-4 hidden lg:block rounded">
          <Newsletter />
        </div>
      </div>
    </>
  );
};

export default Home;
