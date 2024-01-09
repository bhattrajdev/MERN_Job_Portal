import React from "react";
import InputField from "../components/InputFIeld";

const EmploymentType = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Employment Type</h4>

      <div>
        <InputField
          handleChange={handleChange}
          value=""
          title="All"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="Full-time"
          title="Full Time"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="Part-time"
          title="Part Time"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="temporary"
          title="Temporary"
          name="test"
        />
      </div>
    </div>
  );
};

export default EmploymentType;
