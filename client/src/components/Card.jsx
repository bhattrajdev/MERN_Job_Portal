import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

const Card = ({ data }) => {
  const {
    companyName,
    companyLogo,
    minimumSalary,
    maximumSalary,
    title,
    location,
    employmentType,
    postedOn,
    jobDescription,
    _id,
  } = data;
  console.log(_id);
  return (
    <section className="card mb-7">
      <Link
        to={`jobdetails/${_id}`}
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <div className="w-32">
          <img src={companyLogo} alt="" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <h4 className="text-primary mb-1">{companyName}</h4>

          <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-2">
              <FiMapPin /> {location}{" "}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> {employmentType}{" "}
            </span>

            <span className="flex items-center gap-2">
              <FiCalendar /> {postedOn}{" "}
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Card;
