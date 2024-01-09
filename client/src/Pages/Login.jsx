import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from "react-toastify";

  import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("http://localhost:5151/user/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      },config);

      if (response.status === 200 ) {
        localStorage.setItem("token",response.data.token)
      localStorage.setItem("Id",response.data._id)

        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);

      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Internal server error");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center py-2">
        <div className="bg-background px-6 py-6 rounded-md shadow-md w-full max-w-md">
          <div className="text-center text-3xl mb-6 font-bold text-blue-500">
            Login
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-lg mb-2 font-">
                Email :
                {errors.email && (
                  <span className="text-red-500 pl-2">Email is required</span>
                )}
              </label>
              <input
                type="text"
                {...register("email", {
                  required: true,
                })}
                placeholder="Enter your Username"
                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg mb-2 font-">
                Password :
                {errors.password && (
                  <span className="text-red-500 pl-2">
                    Password is required
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

              <p className="text-right pt-2">Forgot Password?</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue text-white py-2 rounded-md uppercase"
            >
              Login
            </button>
          </form>

          {/* Or Signup Using */}

          <p className="py-5 text-lg text-center">or sign in using</p>
          <div className="">
            <div className="flex justify-center gap-5 ">
              <img src={"/images/google.png"} className="w-8 h-8" />
              <img src={"/images/facebook.png"} className="w-8 h-8" />
              <img src={"/images/twitter.png"} className="w-8 h-8" />
            </div>
          </div>

          {/* New Here  */}
          <div className="text-center pt-5">
            New Here?{" "}
            <Link to="/register" className="text-blue font-medium">
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
