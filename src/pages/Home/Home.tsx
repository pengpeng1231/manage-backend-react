import { Button, DatePicker, Space, version } from "antd";

const Home = () => {
  return (
    <div className="App">
      <div style={{ padding: "0 24px" }}>
        <h1>antd version: {version}</h1>
        <Space>
          <DatePicker />
          <Button type="primary">Primary Button</Button>
        </Space>
      </div>
    </div>
  );
};

export default Home;
