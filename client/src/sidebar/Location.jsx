import React from "react";
import InputField from "../components/InputFIeld";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>

      <div>
        <InputField
          handleChange={handleChange}
          value=""
          title="All"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="Kathmandu"
          title="Kathmandu"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="Pokhara"
          title="Pokhara"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="Lalitpur"
          title="Lalitpur"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="Bhaktapur"
          title="Bhaktapur"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
