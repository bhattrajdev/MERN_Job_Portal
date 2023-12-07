import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    const { password, cpassword } = data;

    console.log(password);
    console.log(cpassword);

    if (password !== cpassword) {
      setError("cpassword", {
        message: "Password and confirm password do not match !!",
      });
    } else {
      console.log("Form submitted:", data);
    }
  };

  return (
    <div className="flex justify-center items-center py-2">
      <div className="bg-background px-6 py-6 rounded-md shadow-md w-full max-w-md">
        <div className="text-center text-3xl mb-6 font-bold text-blue-500">
          Register
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* for full name */}
          <div className="mb-6">
            <label className="block text-lg mb-2">
              Full Name :
              {errors.name && (
                <span className="text-red-500 pl-2">Invalid Full Name !!</span>
              )}
            </label>
            <input
              type="text"
              {...register("name", {
                required: true,
                pattern:
                  /^[A-Za-z]+(?: [A-Za-z]+)*(?:-[A-Za-z]+(?: [A-Za-z]+)*)?$/,
              })}
              placeholder="Enter your Full Name"
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* for email */}
          <div className="mb-6">
            <label className="block text-lg mb-2">
              Email :
              {errors.name && (
                <span className="text-red-500 pl-2">Invalid Email !!</span>
              )}
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              placeholder="Enter your Email"
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* for password */}
          <div className="mb-6">
            <label className="block text-lg mb-2">
              Password :
              {errors.password && (
                <span className="text-red-500 pl-2">
                  Password is required !!
                </span>
              )}
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              placeholder="Enter your Password"
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* for confirm password */}
          <div className="mb-6">
            <label className="block text-lg mb-2 font">
              Confirm Password :
              {errors.cpassword && (
                <span className="text-red-500 pl-2">
                  {errors.cpassword.message}
                </span>
              )}
            </label>
            <input
              type="password"
              {...register("cpassword", {
                required: "Confirm password is required",
              })}
              placeholder="Enter your Confirm Password"
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue text-white py-2 rounded-md uppercase"
          >
            register
          </button>
        </form>
        {/* Already a user */}
        <div className="text-center pt-5">
          Alreay a user?{" "}
          <Link to="/login" className="text-blue font-medium">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
