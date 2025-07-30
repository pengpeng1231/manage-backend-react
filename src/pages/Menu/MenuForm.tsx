import { createMenu, editMenu, getMenu, getMenus, Menu } from "@/client";
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSegmented,
  ProFormText,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const MenuForm = () => {
  const formRef = useRef<ProFormInstance<Menu>>(null);
  const { id } = useParams();

  const onFinish = async (values: Menu) => {
    try {
      let res;

      if (values.id) {
        res = await editMenu({ body: values });
      } else {
        res = await createMenu({ body: values });
        formRef.current?.setFieldsValue({ id: res.data?.data });
      }

      if (res.data?.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data?.message);
      }
    } catch (error) {
      message.error("提交失败");
    }
  };

  useEffect(() => {
    if (formRef.current && id) {
      getMenu({
        path: {
          id: Number(id),
        },
      }).then((res) => {
        if (res.data?.success) {
          formRef.current?.setFieldsValue(res.data?.data || {});
        }
      });
    }
  }, [formRef, id]);

  return (
    <ProForm
      formRef={formRef}
      initialValues={{ status: 1, sortNum: 0 }}
      onFinish={onFinish}
    >
      <ProFormText name="id" label="ID" hidden />
      <ProFormText name="name" label="名称" required />
      <ProFormTreeSelect
        label="父级菜单"
        name="parentId"
        placeholder="父级菜单"
        allowClear
        secondary
        request={async () => {
          const res = await getMenus({
            body: {},
          });
          return res.data?.data?.records || [];
        }}
        fieldProps={{
          filterTreeNode: true,
          showSearch: true,
          popupMatchSelectWidth: false,
          labelInValue: false,
          autoClearSearchValue: true,
          treeNodeFilterProp: "title",
          fieldNames: {
            label: "name",
            value: "id",
          },
        }}
      />
      <ProFormText name="path" label="路径" required />
      <ProFormText name="icon" label="图标" />
      <ProFormDigit label="排序" name="sortNum" min={0} max={99999} />
      <ProFormSegmented
        name="status"
        label="状态"
        valueEnum={() => {
          return new Map([
            [1, "开启"],
            [0, "禁用"],
          ]);
        }}
      />
    </ProForm>
  );
};

export default MenuForm;
