import { client } from "./client/client.gen";
import { message } from "antd";

interface InternalAxiosRequestConfig {
  meta?: {
    showMessage?: boolean;
  };
}

// 设置axios配置
client.setConfig({
  withCredentials: true, // 允许跨域，携带cookie
});

// 响应拦截器
client.instance.interceptors.response.use((res) => {
  // 如果需要显示消息
  if ((res.config as InternalAxiosRequestConfig).meta?.showMessage) {
    if (res.data?.success) {
      message.success(res.data.message);
    } else {
      message.error(res.data?.message);
    }
  }

  return res;
});
