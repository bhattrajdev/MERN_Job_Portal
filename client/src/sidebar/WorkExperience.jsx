import React from "react";
import InputField from "../components/InputFIeld";

const WorkExperience = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>

      <div>
        <InputField
          handleChange={handleChange}
          value=""
          title="All"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="Any experience"
          title="Any experience"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="Internship"
          title="Internship"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="Work remotely"
          title="Work Remotely"
          name="test"
        />
      </div>
    </div>
  );
};

export default WorkExperience;
