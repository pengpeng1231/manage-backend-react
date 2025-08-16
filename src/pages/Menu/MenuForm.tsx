import { createMenu, editMenu, getMenu, getMenus, Menu } from "@/client";
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSegmented,
  ProFormSwitch,
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
        res = await editMenu({
          body: values,
          meta: {
            showMessage: true,
          },
        });
      } else {
        res = await createMenu({
          body: values,
          meta: {
            showMessage: true,
          },
        });
        formRef.current?.setFieldsValue({ id: res.data?.data });
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
      <ProFormText name="name" label="名称" rules={[{ required: true }]} />
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
      <ProFormText name="path" label="路径" rules={[{ required: true }]} />
      <ProFormText name="icon" label="图标" />
      <ProFormDigit label="排序" name="sortNum" min={0} max={99999} />
      <ProFormSegmented
        name="status"
        label="状态"
        valueEnum={() => {
          return new Map([
            [0, "开启"],
            [1, "禁用"],
          ]);
        }}
      />
      <ProFormSwitch name="hideInMenu" label="隐藏菜单" />
    </ProForm>
  );
};

export default MenuForm;
