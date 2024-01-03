import React from "react";

const JobDetailCard = ({ icon, data, text }) => {
  return (
    <div className="flex gap-4">
      <span className="rounded-md font-semibold bg-blue opacity-80 p-3 text-3xl text-white">
        {icon}
      </span>
      <div className="flex gap-1 flex-col">
        <h4 className="font-semibold">{text}</h4>
        <p>{data}</p>
      </div>
    </div>
  );
};

export default JobDetailCard;
