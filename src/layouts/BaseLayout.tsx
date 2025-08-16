import {
  PageContainer,
  ProLayout,
  DefaultFooter,
  MenuDataItem,
} from "@ant-design/pro-components";
import { GithubOutlined } from "@ant-design/icons";
import * as icons from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getUserMenuList } from "@/client";
import { Tabs } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

export interface PageConfig {
  hideBreadcrumb?: boolean;
  hideTitle?: boolean;
}

const BaseLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    hideBreadcrumb: false,
    hideTitle: false,
  });

  const requestMenu = async () => {
    const res = await getUserMenuList();
    const list = res.data?.data as MenuDataItem[];
    return list;
  };

  const navigateTo = (item: MenuDataItem) => {
    navigate(item.path!);
  };

  useEffect(() => {
    console.log(location);
    setPageConfig({
      hideBreadcrumb: false,
      hideTitle: false,
    });
  }, [location]);

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
      <PageContainer>
        <Outlet context={{ setPageConfig }}></Outlet>
      </PageContainer>
    </ProLayout>
  );
};

export default BaseLayout;
