import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { checkAuth, UserVo } from "./client";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import routes from "./routes/routes";

// 动态生成路由配置
function generateRoutes() {
  const baseRoutes = routes;

  return createBrowserRouter(baseRoutes);
}

function App() {
  const [user, setUser] = useState<UserVo | undefined>(undefined);

  const router = generateRoutes();

  const authCheck = async () => {
    const res = await checkAuth();

    if (res.data?.success) {
      setUser(res.data?.data);
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

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
