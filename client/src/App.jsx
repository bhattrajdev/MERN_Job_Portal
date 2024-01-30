import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css"
import { ToastContainer, toast } from "react-toastify";

const App = () => {


  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
