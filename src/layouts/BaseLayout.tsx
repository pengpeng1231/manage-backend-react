import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "@/client";
import { message } from "antd";

const BaseLayout = () => {
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
    return <Navigate to="/login" replace />;
  }

  return (
    <ProLayout>
      <PageContainer>
        <Outlet></Outlet>
      </PageContainer>
    </ProLayout>
  );
};

export default BaseLayout;
