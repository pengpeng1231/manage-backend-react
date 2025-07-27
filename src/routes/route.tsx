import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Login from "../pages/Login/Login";

const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const UserProfile = lazy(() => import("../pages/UserProfile/UserProfile"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Menu = lazy(() => import("../pages/Menu/Menu"));

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
        path: "menu",
        element: <Menu />,
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
