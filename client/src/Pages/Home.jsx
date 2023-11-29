import React, { useEffect } from "react";
import Banner from "../components/Banner";
import { useState } from "react";
import Card from "../components/Card";
import { Jobs } from "./Jobs";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);

  // handle input change
  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
    
  // radio based filtering 
  const handleChange = (e) =>{
    setSelectedCategory(e.target.value) 
  }

  // button based filtering 
  const handleClick = (e) =>{
    setSelectedCategory(e.target.value)
  }

  // main function
  const filteredData = (jobs, selected,query) =>{
    let filteredJobs = jobs;
    
    // filtering input items
    if(query){
      filteredJobs = filteredItems
    }

    // filtering category
    if(selected){
      filteredJobs = filteredJobs.filter(({jobLocation,maxPrice,experienceLevel,salaryType,employmentType,postingDate})=>(
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) <= parseInt(selected) ||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase()

      ))
      console.log(filteredJobs)
    }
    return filteredJobs.map((data,index) =><Card key={index} data={data}/>)
  }

  const result = filteredData(jobs,selectedCategory,query )
  return (
    <>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">Left</div>
        <div className="col-span-2 bg-white p-4 rounded">
          {" "}
          <Jobs result={result} />
        </div>
        <div bg-white p-4 rounded>
          Right
        </div>
      </div>
    </>
  );
};

export default Home;
