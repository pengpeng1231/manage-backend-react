import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout";
import Login from "@/pages/Login/Login";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound/NotFound";

const MenuList = lazy(() => import("@/pages/Menu/MenuList"));
const MenuForm = lazy(() => import("@/pages/Menu/MenuForm"));
const UserProfile = lazy(() => import("@/pages/UserProfile/UserProfile"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "menu",
        children: [
          {
            index: true,
            element: <Navigate to="list" replace />,
          },
          {
            path: "list",
            element: <MenuList />,
          },
          {
            path: "form/:id?",
            element: <MenuForm />,
          },
        ],
      },
      {
        path: "userProfile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
