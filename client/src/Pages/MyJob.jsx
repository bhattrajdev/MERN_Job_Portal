import React, { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const YourComponent = () => {
  const [jobs, setJobs] = useState([]);
  const userId = localStorage.getItem("Id");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
const viewHandler = (id) =>{
  navigate(`/my-job-detail/${id}`);
}
const editHandler = () =>{

}
const deleteHandler =() =>{

}


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get(`/job/myjob/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data); // Access the data property of the response
        setJobs(response.data); // Assuming the response contains an array of jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [userId, token]); // Include 'token' in the dependency array to re-run the effect when the token changes

  return (
    <div className="container mx-auto px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">My Jobs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="create-table-border">S.N.</th>
              <th className="create-table-border">Logo</th>
              <th className="create-table-border">Title</th>
              <th className="create-table-border">Posted On</th>
              <th className="create-table-border">Expiry Date</th>
              <th className="create-table-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((job, index) => (
                <tr key={job._id}>
                  <td className="create-table-border">{index + 1} </td>
                  <td className="create-table-border">
                    <img
                      src={job.companyLogo}
                      alt="Job Image"
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="create-table-border">{job.title}</td>
                  <td className="create-table-border">{job.postedOn}</td>
                  <td className="create-table-border">{job.expiryDate}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => viewHandler(job._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>

                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YourComponent;
