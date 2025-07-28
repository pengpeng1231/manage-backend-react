import { ProTable } from "@ant-design/pro-components";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { Key, useState } from "react";
import { ProTableProps } from "@ant-design/pro-components";

export type BaseProTableProps<
  DataSource extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  ValueType = "text"
> = ProTableProps<DataSource, U, ValueType> & {
  hidePrint?: boolean;
  hideImport?: boolean;
  hideExport?: boolean;
};

const BaseProTable = <
  DataSource extends Record<string, any>,
  U extends Record<string, any>,
  ValueType = "text"
>(
  props: BaseProTableProps<DataSource, U, ValueType>
) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  return (
    <ProTable
      {...props}
      rowSelection={
        props.rowSelection ?? {
          alwaysShowAlert: selectedRowKeys.length > 0,
          selectedRowKeys: selectedRowKeys,
          onChange: setSelectedRowKeys,
        }
      }
      toolbar={{
        title: [
          <Space>
            {!props.hideImport && (
              <Button
                color="green"
                variant="solid"
                title="导入"
                key="import"
                size="small"
              >
                <DownloadOutlined />
                导入
              </Button>
            )}

            {!props.hideExport && (
              <Button
                color="orange"
                variant="solid"
                title="导出"
                key="export"
                size="small"
              >
                <UploadOutlined />
                导出
              </Button>
            )}
            {!props.hidePrint && (
              <Button type="default" title="打印" key="print" size="small">
                <PrinterOutlined />
                打印
              </Button>
            )}
          </Space>,
        ],
        actions: [
          <Space style={{ marginRight: "6px" }}>
            <Button
              type="primary"
              shape="circle"
              title="添加"
              key="add"
              size="small"
            >
              <PlusOutlined />
            </Button>
            {selectedRowKeys.length > 0 && (
              <Button
                type="primary"
                danger
                shape="circle"
                title="删除"
                key="delete"
                size="small"
              >
                <DeleteOutlined />
              </Button>
            )}
          </Space>,
        ],
      }}
      rowKey="id"
    />
  );
};

export default BaseProTable;
