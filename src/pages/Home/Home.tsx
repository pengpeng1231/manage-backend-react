import { Button, DatePicker, Space, version } from "antd";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { PageConfig } from "@/layouts/BaseLayout";

const Home = () => {
  const { setPageConfig } = useOutletContext<any>();

  useEffect(() => {
    setPageConfig((prev: PageConfig) => {
      return {
        ...prev,
        hideBreadcrumb: true,
        hideTitle: true,
      };
    });
  }, [setPageConfig]);

  return (
    <div>
      <h1>antd version: {version}</h1>
      <Space>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </Space>
    </div>
  );
};

export default Home;
