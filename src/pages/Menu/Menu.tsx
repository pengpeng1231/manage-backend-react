import BaseProTable from "@components/BaseProTable/BaseProTable";

const Menu = () => {
  return (
    <BaseProTable
      columns={[
        {
          title: "名称",
          dataIndex: "name",
        },
      ]}
      request={async () => {
        return {
          data: [
            {
              id: "1",
              name: "Node 1",
              children: [{ id: "1-1", name: "Child Node 1" }],
            },
          ],
        };
      }}
    />
  );
};

export default Menu;
