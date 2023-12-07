import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import About from "../Pages/About";
import CreateJob from "../Pages/CreateJob";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },  
      { path: "/post-job", element: <CreateJob /> },  
      { path: "/login", element: <Login/> },  
      { path: "/register", element: <Register/> },  
    
    ],
  },
]);

export default Router;
