import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <ProLayout>
      <PageContainer>
        <Outlet></Outlet>
      </PageContainer>
    </ProLayout>
  );
};

export default BaseLayout;
