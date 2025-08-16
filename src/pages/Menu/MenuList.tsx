import { delMenu, editMenu, getMenus, Menu } from "@/client";
import { ProColumns } from "@ant-design/pro-components";
import BaseProTable, {
  type BaseProTableProps,
} from "@components/BaseProTable/BaseProTable";
import { message, Select, Switch, TreeSelect } from "antd";
import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<Menu[]>([]);
  const columns: ProColumns<Menu>[] = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "父级菜单",
      dataIndex: "parentId",
      renderFormItem() {
        return (
          <TreeSelect
            treeData={dataSource}
            placeholder="父级菜单"
            allowClear
            filterTreeNode
            showSearch
            popupMatchSelectWidth
            labelInValue={false}
            autoClearSearchValue
            treeNodeFilterProp="title"
            fieldNames={{
              label: "name",
              value: "id",
            }}
          ></TreeSelect>
        );
      },
    },
    {
      title: "路径",
      dataIndex: "path",
    },
    {
      title: "图标",
      dataIndex: "icon",
      hideInSearch: true,
    },
    {
      title: "排序",
      dataIndex: "sortNum",
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      renderFormItem() {
        return (
          <Select
            defaultValue={null}
            placeholder="状态"
            options={[
              { label: "全部", value: null },
              { label: "开启", value: 0 },
              { label: "禁用", value: 1 },
            ]}
          ></Select>
        );
      },
    },
    {
      title: "隐藏菜单",
      dataIndex: "hideInMenu",
      hideInSearch: true,
      render(_, record) {
        return (
          <Switch
            defaultChecked={record.hideInMenu}
            onChange={(hideInMenu) => {
              editMenu({
                body: {
                  ...record,
                  hideInMenu,
                },
                meta: {
                  showMessage: true,
                },
              });
            }}
          ></Switch>
        );
      },
    },
  ];

  const request: BaseProTableProps["request"] = async (params) => {
    const res = await getMenus({
      body: {
        ...params,
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

  const onAdd = () => {
    navigate("/menu/form");
  };

  const onEdit = (record: Menu) => {
    navigate(`/menu/form/${record.id}`);
  };

  const onDelete = async (keys: Key[]) => {
    try {
      await delMenu({
        body: { ids: keys as number[] },
        meta: {
          showMessage: true,
        },
      });
    } catch (error) {
      message.error("删除失败");
    }
  };

  useEffect(() => {
    getMenus({
      body: {},
    }).then((res) => {
      setDataSource(res.data?.data?.records || []);
    });
  }, []);

  return (
    <BaseProTable
      columns={columns}
      request={request}
      onAdd={onAdd}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
};

export default MenuPage;
