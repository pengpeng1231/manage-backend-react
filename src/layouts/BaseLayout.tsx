import {
  PageContainer,
  ProLayout,
  DefaultFooter,
  MenuDataItem,
} from "@ant-design/pro-components";
import { GithubOutlined } from "@ant-design/icons";
import * as icons from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuth, getUserMenuList } from "@/client";
import { message, Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

export interface PageConfig {
  hideBreadcrumb?: boolean;
  hideTitle?: boolean;
}

const BaseLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    hideBreadcrumb: false,
    hideTitle: false,
  });

  const requestMenu = useCallback(async () => {
    if (!isAuthenticated) {
      return new Promise<MenuDataItem[]>(() => {});
    }

    const res = await getUserMenuList();
    return res.data?.data as MenuDataItem[];
  }, [isAuthenticated]);

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

  const navigateTo = (item: MenuDataItem) => {
    navigate(item.path!);
  };

  useEffect(() => {
    authCheck();
  }, []);

  useEffect(() => {
    setPageConfig({
      hideBreadcrumb: false,
      hideTitle: false,
    });
  }, [location]);

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return (
    <ProLayout
      className="base-layout"
      layout="mix"
      location={location}
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
      pageTitleRender={(item) =>
        pageConfig.hideTitle ? "" : (item.title as string)
      }
      menuItemRender={(item: MenuDataItem, dom) => (
        <span onClick={() => navigateTo(item)}>{dom}</span>
      )}
      menu={{
        request: requestMenu,
      }}
      defaultCollapsed={true}
    >
      <Tabs
        className="base-layout_tabs"
        items={[
          { label: "Tab 1", key: "1" },
          { label: "Tab 2", key: "2" },
        ]}
        type="editable-card"
        hideAdd
      />
      <PageContainer
        header={{
          breadcrumb: pageConfig.hideBreadcrumb
            ? undefined
            : {
                items: [
                  {
                    path: "",
                    title: "一级页面",
                  },
                  {
                    path: "",
                    title: "二级页面",
                  },
                  {
                    path: "",
                    title: "当前页面",
                  },
                ],
              },
        }}
      >
        <Outlet context={{ setPageConfig }}></Outlet>
      </PageContainer>
    </ProLayout>
  );
};

export default BaseLayout;
