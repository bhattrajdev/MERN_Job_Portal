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
  const [data, setData] = useState([]);
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

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredItems = jobs.filter(
    (job) => job.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

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
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filteredItems;
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => {
          // Convert maxPrice and selected to integers if they are supposed to be numeric
          const parsedMaxPrice = parseInt(maxPrice);
          const parsedSelected = parseInt(selected);

          // Ensure that jobLocation is defined before performing operations
          const isJobLocationMatch =
            jobLocation && jobLocation.toLowerCase() === selected.toLowerCase();
          const isMaxPriceMatch =
            !isNaN(parsedMaxPrice) && parsedMaxPrice <= parsedSelected;
          const isPostingDateMatch =
            postingDate && new Date(postingDate) >= new Date(selected);
          const isSalaryTypeMatch =
            salaryType && salaryType.toLowerCase() === selected.toLowerCase();
          const isEmploymentTypeMatch =
            employmentType &&
            employmentType.toLowerCase() === selected.toLowerCase();
          const isExperienceLevelMatch =
            experienceLevel &&
            experienceLevel.toLowerCase() === selected.toLowerCase();

          // Filter conditions
          return (
            isJobLocationMatch ||
            isMaxPriceMatch ||
            isPostingDateMatch ||
            isSalaryTypeMatch ||
            isEmploymentTypeMatch ||
            isExperienceLevelMatch
          );
        }
      );
    }

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, index) => <Card key={index} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

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
          ) : result.length > 0 ? (
            <Jobs result={result} />
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
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
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
