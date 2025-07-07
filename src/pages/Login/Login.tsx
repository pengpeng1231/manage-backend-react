import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { theme } from "antd";
import { message } from "antd";
import { loginOrRegister } from "@/client";
import type { LoginDto } from "@/client";

const LoginLayout = () => {
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: LoginDto) => {
    try {
      const res = await loginOrRegister({
        body: {
          username: values.username,
          password: values.password,
        },
      });

      if (res.data?.success) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
      } else {
        messageApi.open({
          type: "error",
          content: res.data?.message,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "登录失败",
      });
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      {contextHolder}
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="https://github.githubassets.com/favicons/favicon.png"
          title="Github"
          subTitle="全球最大的代码托管平台"
          onFinish={onFinish}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"用户名"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"密码"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default LoginLayout;
