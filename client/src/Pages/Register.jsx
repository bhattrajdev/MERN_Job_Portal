import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    const { password, cpassword, name, email } = data;

    if (password !== cpassword) {
      setError("cpassword", {
        message: "Password and confirm password do not match !!",
      });
    } else {
      console.log("Form submitted:", data);

      try {
        const response = await api.post("/user", {
          name: name,
          email: email,
          password: password,
        });

        console.log("API Response:", response.data);
        if (response.status === 201) {
          toast.success("User Registered Successfully");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else if (response.status === 403) {
          toast.error("User already exists");
        } else {
          toast.error("Error Registering user");
        }
      } catch (error) {
        console.error("Error while registering user:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
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
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <span className="text-red-500 pl-2">{message}</span>
                  )}
                />
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required !!!",
                  validate: {
                    validName: (value) =>
                      /^[A-Za-z]+$/.test(value) ||
                      "Invalid characters in the name!",
                    length: (value) =>
                      value.length >= 3 || "Name must be at least 4 letters!",
                  },
                })}
                placeholder="Enter your Full Name"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* for email */}
            <div className="mb-6">
              <label className="block text-lg mb-2">
                Email :
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <span className="text-red-500 pl-2">{message}</span>
                  )}
                />
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email is Required !!!",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid Email !!!",
                  },
                })}
                placeholder="Enter your Email"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* for password */}
            <div className="mb-6">
              <label className="block text-lg mb-2">
                Password :
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <span className="text-red-500 pl-2">{message}</span>
                  )}
                />
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    uppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    symbol: (value) =>
                      /[!@#$%^&*]/.test(value) ||
                      "Password must contain at least one symbol",
                    number: (value) =>
                      /[0-9]/.test(value) ||
                      "Password must contain at least one number",
                    length: (value) =>
                      value.length >= 8 ||
                      "Password must be at least 8 characters long",
                  },
                })}
                placeholder="Enter your Password"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* for confirm password */}
            <div className="mb-6">
              <label className="block text-lg mb-2 font">
                Confirm Password :
                <ErrorMessage
                  errors={errors}
                  name="cpassword"
                  render={({ message }) => (
                    <span className="text-red-500 pl-2">{message}</span>
                  )}
                />
              </label>
              <input
                type="password"
                {...register("cpassword", {
                  required: "Password is required",
                  validate: {
                    uppercase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    symbol: (value) =>
                      /[!@#$%^&*]/.test(value) ||
                      "Password must contain at least one symbol",
                    number: (value) =>
                      /[0-9]/.test(value) ||
                      "Password must contain at least one number",
                    length: (value) =>
                      value.length >= 8 ||
                      "Password must be at least 8 characters long",
                  },
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
    </>
  );
};

export default Register;
