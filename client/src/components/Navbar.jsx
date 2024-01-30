import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark, FaUser } from "react-icons/fa6";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem('Id')
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const loginHandler = () => {
    
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

 const logoutHandler = () => {
      localStorage.removeItem("token");
       localStorage.removeItem("Id");
   
 };


  useEffect(() => {
    loginHandler() 
    const localStorageChangeHandler = () => {
      loginHandler();
    };

    window.addEventListener("storage", localStorageChangeHandler);
    return () => {
      window.removeEventListener("storage", localStorageChangeHandler);
    };
  }, [token]);

 
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Job" },
    { path: "/post-job", title: "Post a Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <Link to="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
        </Link>

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

        {/* User dropdown for large devices */}
        {isLogin && (
          <div
            className="relative group hidden md:flex items-center cursor-pointer"
            onClick={handleToggleDropdown}
          >
            <div className="flex items-center gap-2">
              <FaUser />
              <span className="text-base text-black font-medium">
                {/* Display user name or other user information here */}
              </span>
            </div>

            {isDropdownVisible && (
              <div className="absolute right-0 top-4 mt-2 space-y-2 bg-white border rounded-md shadow-lg w-48">
                <button
                  onClick={() => {
                    navigate("/jobhistory");
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-200"
                >
                  Job History
                </button>
                <button
                  onClick={logoutHandler}
                  className="w-full px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {!isLogin && (
          <>
            <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
              <Link to="/login" className="py-2 px-5 border rounded">
                Log in
              </Link>
              <Link
                to="/register"
                className="py-2 px-5 border rounded bg-blue text-white"
              >
                Sign up
              </Link>
            </div>
          
          </>
        )}
        {/* Hamburger icon for mobile */}
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

      {/* Mobile menu */}
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
            {isLogin && (
              <>
                <li className="text-white py-1">
                  <button
                    onClick={() => {
                      navigate("/jobhistory");
                    }}
                  >
                    Job History
                  </button>
                </li>
                <li className="text-white py-1">
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </>
            )}
            {!isLogin && (
              <>
                <li className="text-white py-1">
                  <Link to="/login">Log in</Link>
                </li>
                <li className="text-white py-1">
                  <Link to="/Sign up">Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
