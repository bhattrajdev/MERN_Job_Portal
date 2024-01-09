import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark, FaUser } from "react-icons/fa6";
import api from "../config/api";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const loginHandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    loginHandler();

    const localStorageChangeHandler = () => {
      loginHandler();
    };

    window.addEventListener("storage", localStorageChangeHandler);
    return () => {
      window.removeEventListener("storage", localStorageChangeHandler);
    };
  }, []);


  const logoutHandler = async () => {
    try {
      const response = await api.post(`/auth/destroy-token`);
     if(response.data.isLogout){
      localStorage.removeItem('token');
        }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Job" },
    { path: "/salary", title: "Salary Estimated" },
    { path: "/post-job", title: "Post a Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            xmlns="http://www/w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          JobPortal
        </a>

        {/* Nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* sign up and login button */}
        {isLogin ? (
          // code if user is login
          <div
            className="relative group"
            onClick={handleToggleDropdown}
            onBlur={() => setDropdownVisible(false)}
          >
            {/* Additional wrapper for user icon */}
            <div className="flex cursor-pointer group-hover:bg-gray-100">
              <FaUser />
            </div>

            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 space-y-2 bg-white border rounded-md shadow-lg w-48">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Settings
                </a>
                <button
                  onClick={logoutHandler}
                  className="w-full px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // code if user not login
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            <Link to="/login" className="py-2 px-5 border rounded">
              Log in
            </Link>
            <Link
              to="/Sign up"
              className="py-2 px-5 border rounded bg-blue text-white"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggle}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* navitems for mobile screen */}
      {isMenuOpen && (
        <div className="px-4 bg-black py-5 rounded">
          <ul>
            {navItems.map(({ path, title }) => (
              <li
                key={path}
                className="text-base text-white first:text-white py-1"
              >
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            ))}

            <li className="text-white py-1">
              <Link to="/login">Log in</Link>
            </li>
            <li className="text-white py-1">
              <Link to="/Sign up">Sign up</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
