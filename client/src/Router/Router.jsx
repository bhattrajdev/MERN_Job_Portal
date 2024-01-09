import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import App from "../App";
import About from "../Pages/About";
import CreateJob from "../Pages/CreateJob";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import JobDetail from "../Pages/JobDetail";
import PageNotFound from "../Errors/PageNotFound";
import MyJob from "../Pages/MyJob";
import MyJobDetail from "../Pages/MyJobDetail";
import RouteMiddleware from "../middleware/RouteMiddleware";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: `/jobdetails/:_id`, element: <JobDetail /> },
      {
        path: `/my-job`,
        element: (
          <RouteMiddleware>
            <MyJob />
          </RouteMiddleware>
        ),
      },
      {
        path: `/my-job-detail/:_id`,
        element: (
          <RouteMiddleware>
            <MyJobDetail />
          </RouteMiddleware>
        ),
      },
      {
        path: "/post-job",
        element: (
          <RouteMiddleware>
            <CreateJob />
          </RouteMiddleware>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default Router;
