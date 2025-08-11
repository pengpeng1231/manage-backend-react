import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import BasePage from "../layouts/BasePage";
import Login from "../pages/Login/Login";

const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const UserProfile = lazy(() => import("../pages/UserProfile/UserProfile"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const MenuList = lazy(() => import("../pages/Menu/MenuList"));
const MenuForm = lazy(() => import("../pages/Menu/MenuForm"));

const router = createBrowserRouter([
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
        element: <BasePage />,
        children: [
          {
            path: "",
            element: <MenuList />,
          },
          {
            path: "form/:id?",
            element: <MenuForm />,
          },
        ],
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
]);

export default router;
