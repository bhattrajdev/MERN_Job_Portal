import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import About from "../Pages/About";
import CreateJob from "../Pages/CreateJob";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import JobDetail from "../Pages/JobDetail";
import PageNotFound from "../Errors/PageNotFound";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },  
      { path: `/jobdetails/:_id`, element: <JobDetail /> },
      { path: "/post-job", element: <CreateJob /> },  
      { path: "/login", element: <Login/> },  
      { path: "/register", element: <Register/> },  
    ],
  },{
    path: "*",
    element: <PageNotFound/>
  }
]);

export default Router;
