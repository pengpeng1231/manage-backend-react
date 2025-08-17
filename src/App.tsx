import { Navigate, RouteObject, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { checkAuth } from "./client";
import { lazy, useEffect } from "react";
import { message, Spin } from "antd";
import routes from "./routes/routes";
import userStore from "./store/user";
import { MenuVo } from "@/client";

// 动态生成路由配置
function generateRoutes(menus: MenuVo[]) {
  const baseRoutes = routes;

  const generateMenu = (menu: MenuVo): RouteObject => {
    const route = {} as RouteObject;

    const Component = menu.component
      ? lazy(() => import(`@/pages/${menu.component}`))
      : null;

    let path = menu.path ? menu.path.replace(/^\//, "") : "";

    if (menu.path) {
      path += menu.params ? menu.params : "";
    }

    route.path = path;

    if (Component) {
      route.element = <Component />;
    }

    if (menu.redirect && menu.children?.length) {
      route.children = menu.children.map((child) => generateMenu(child));

      route.children.unshift({
        index: true,
        element: <Navigate to={menu.redirect} replace />,
      });
    }

    return route;
  };

  baseRoutes[0].children?.push(
    ...menus.map((menu) => {
      return generateMenu(menu);
    })
  );

  return createBrowserRouter(baseRoutes);
}

function App() {
  const { user, menus, setMenus, setUser } = userStore();

  const authCheck = async () => {
    const res = await checkAuth();

    if (res.data?.success) {
      setUser(res.data?.data?.user!);
      setMenus(res.data?.data?.menus!);
    } else {
      message.error(res.data?.message);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  if (!user) {
    return <Spin />;
  }

  const router = generateRoutes(menus);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
