import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {FaBarsStaggered, FaXmark} from 'react-icons/fa6'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToogle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-jobs", title: "My Job" },
    { path: "/salary", title: "Salary Estmiated" },
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

        {/* mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToogle}>
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
              <Link to="/login">
                Log in
              </Link>
            </li>
            <li className="text-white py-1"> 
              <Link to="/Sign up">
                Sign in
              </Link>
            </li>

    
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
