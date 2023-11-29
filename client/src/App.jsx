import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./app.css"
const App = () => {
  return (
    <>
    <Navbar/>
      <Outlet />
      <footer>This is the footer</footer>
    </>
  );
};

export default App;
