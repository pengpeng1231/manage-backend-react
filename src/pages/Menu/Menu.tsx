import { getMenus } from "@/client";
import BaseProTable, {
  type BaseProTableProps,
} from "@components/BaseProTable/BaseProTable";

const MenuPage = () => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
  ];

  const request: BaseProTableProps["request"] = async (
    params,
    sort,
    filter
  ) => {
    console.log(params, sort, filter);

    const res = await getMenus({
      query: {
        current: params.current!,
        pageSize: params.pageSize!,
      },
    });

    const data = res.data?.data?.records;
    const success = res.data?.success;
    const total = res.data?.data?.total;

    return {
      data,
      success,
      total,
    };
  };

  return <BaseProTable columns={columns} request={request} />;
};

export default MenuPage;
