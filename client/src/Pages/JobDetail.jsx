import React from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
    const id = useParams()._id
    console.log(id);
  return (
    <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
'      JobDetail
    </div>
  );
};

export default JobDetail;
