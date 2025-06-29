import { RouteObject } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import UserProfile from "../pages/UserProfile/UserProfile";
import NotFound from "../pages/NotFound/NotFound";
import BaseLayout from "../layouts/BaseLayout";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users/:id",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
