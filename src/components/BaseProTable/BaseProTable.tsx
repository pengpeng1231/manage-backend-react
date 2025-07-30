import { ActionType, ProTable } from "@ant-design/pro-components";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Space, Modal } from "antd";
import { Key, ReactNode, useRef, useState } from "react";
import { ProTableProps } from "@ant-design/pro-components";

export type BaseProTableProps<
  DataSource extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  ValueType = "text"
> = ProTableProps<DataSource, U, ValueType> & {
  hidePrint?: boolean;
  hideImport?: boolean;
  hideExport?: boolean;
  onAdd?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onDelete?: (keys: Key[]) => void;
  onPrint?: () => void;
  onEdit?: (record: DataSource) => void;
};

const BaseProTable = <
  DataSource extends Record<string, any>,
  U extends Record<string, any>,
  ValueType = "text"
>(
  props: BaseProTableProps<DataSource, U, ValueType>
) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const actionRef = useRef<ActionType>(null);
  const actualActionRef = props.actionRef || actionRef;

  const columns = [
    ...(props.columns || []),
    {
      title: "操作",
      dataIndex: "action",
      hideInSearch: true,
      render: (_: ReactNode, record: DataSource) => {
        return (
          <Space>
            <Button type="link" onClick={() => props.onEdit?.(record)}>
              编辑
            </Button>
            <Button type="link" onClick={() => onDelete([record.id])}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const onDelete = async (keys: Key[]) => {
    Modal.confirm({
      title: "删除",
      content: "确定要删除选中的数据吗？",
      onOk: async () => {
        await props.onDelete?.(keys);
        setSelectedRowKeys([]);
        actionRef.current?.reload();
      },
    });
  };

  return (
    <ProTable
      {...props}
      columns={columns}
      actionRef={actualActionRef}
      rowSelection={
        props.rowSelection ?? {
          alwaysShowAlert: selectedRowKeys.length > 0,
          selectedRowKeys: selectedRowKeys,
          onChange: setSelectedRowKeys,
        }
      }
      toolbar={{
        title: [
          <Space key="title-actions">
            {!props.hideImport && (
              <Button
                color="green"
                variant="solid"
                title="导入"
                key="import"
                size="small"
                onClick={() => props.onImport?.()}
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
                onClick={() => props.onExport?.()}
              >
                <UploadOutlined />
                导出
              </Button>
            )}
            {!props.hidePrint && (
              <Button
                type="default"
                title="打印"
                key="print"
                size="small"
                onClick={() => props.onPrint?.()}
              >
                <PrinterOutlined />
                打印
              </Button>
            )}
          </Space>,
        ],
        actions: [
          <Space key="actions" style={{ marginRight: "6px" }}>
            <Button
              type="primary"
              shape="circle"
              title="添加"
              key="add"
              size="small"
              onClick={() => props.onAdd?.()}
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
                onClick={() => onDelete(selectedRowKeys)}
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
