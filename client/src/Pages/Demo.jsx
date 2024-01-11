import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Demo = () => {
 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm();

  const [showModal, setShowModal] = React.useState(true);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open Job Application Form
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl flex font-semibold">
                    Job Application Form
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* for email */}
                    <div className="mb-3">
                      <label className="block text-base mb-2">
                        Email:
                        <ErrorMessage
                          errors={errors}
                          name="email"
                          render={({ message }) => (
                            <span className="text-red-500 pl-2">{message}</span>
                          )}
                        />
                        <input
                          type="text"
                          {...register("email", {
                            required: "Email is Required !!!",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Invalid Email !!!",
                            },
                          })}
                          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                        />
                      </label>
                    </div>

                    {/* for contact number */}
                    <div className="mb-3">
                      <label className="block text-base mb-2">
                        Contact Number:
                        <ErrorMessage
                          errors={errors}
                          name="contact"
                          render={({ message }) => (
                            <span className="text-red-500 pl-2">{message}</span>
                          )}
                        />
                      </label>
                      <input
                        type="text"
                        {...register("contact", {
                          required: "Contact is Required !!!",
                          pattern: {
                            value:
                              /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                            message: "Invalid Contact !!!",
                          },
                        })}
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* for cover letter */}
                    <div className="mb-3">
                      <label className="block text-base mb-2">
                        Cover Letter:
                        {errors.coverLetter && (
                          <span className="text-red-500 pl-2">
                            Cover Letter is required
                          </span>
                        )}
                      </label>
                      <textarea
                        type="text"
                        rows={5}
                        {...register("coverLetter", {
                          required: true,
                        })}
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* for resume */}
                    <div className="mb-3">
                      <label className="block text-base mb-2">
                        Upload Resume :
                        <ErrorMessage
                          errors={errors}
                          name="resume"
                          render={({ message }) => (
                            <span className="text-red-500 pl-2">{message}</span>
                          )}
                        />
                        {/*  */}
                      </label>
                      <input
                        type="file"
                        {...register("resume", {
                          required: "Resume is Required !!!",
                          validate: (value) => {
                            const acceptedFormats = ["pdf","docx","doc"];
                            const fileExtension = value[0]?.name
                              .split(".")
                              .pop()
                              .toLowerCase();
                            if (!acceptedFormats.includes(fileExtension)) {
                              return "Invalid file format !!!";
                            }
                            return true;
                          },
                        })}
                        accept=".pdf,.doc,.docx"
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mt-6 flex gap-3 justify-end">
                      <button
                        type="button"
                        className="text-base bg-red-600 p-2 rounded-sm text-white"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="text-base bg-green-600 p-2 rounded-sm text-white"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
                {/* footer */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Demo;
