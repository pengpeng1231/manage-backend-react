import {
  PageContainer,
  ProLayout,
  DefaultFooter,
  MenuDataItem,
} from "@ant-design/pro-components";
import { GithubOutlined } from "@ant-design/icons";
import * as icons from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "@/client";
import { message } from "antd";
import { useLocation } from "react-router-dom";

const BaseLayout = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await checkAuth();
        if (res.data?.success) {
          setIsAuthenticated(true);
        } else {
          message.error(res.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };

    authCheck();
  }, []);

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return (
    <ProLayout
      layout="mix"
      headerTitleRender={() => "React Test"}
      headerContentRender={() => <div>Header Content</div>}
      footerRender={() => (
        <DefaultFooter
          copyright="@2019 蚂蚁金服体验技术部出品"
          links={[
            {
              key: "Ant Design Pro",
              title: "Ant Design Pro",
              href: "https://pro.ant.design",
              blankTarget: true,
            },
            {
              key: "github",
              title: <GithubOutlined />,
              href: "https://github.com/ant-design/ant-design-pro",
              blankTarget: true,
            },
            {
              key: "Ant Design",
              title: "Ant Design",
              href: "https://ant.design",
              blankTarget: true,
            },
          ]}
        />
      )}
      pageTitleRender={() => "React Test"}
      menu={{
        request: async () => {
          return [
            {
              path: "/dashboard",
              name: "Dashboard",
              icon: <icons.GithubOutlined />,
            },
            {
              path: "/user",
              name: "User Management",
              icon: <icons.GithubOutlined />,
              children: [
                {
                  path: "/user/list",
                  name: "User List",
                },
                {
                  path: "/user/create",
                  name: "Create User",
                },
              ],
            },
          ];
        },
      }}
    >
      <PageContainer>
        <Outlet></Outlet>
      </PageContainer>
    </ProLayout>
  );
};

export default BaseLayout;
