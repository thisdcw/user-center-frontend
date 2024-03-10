import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {useRef} from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";
import {DEFAULT_AVATAR} from "@/constant";

const columns: ProColumns<API.CurrentUser>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true,
    },
    {
      title: '账户',
      dataIndex: 'userAccount',
      copyable: true,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      render: (a, record) => (
        <div>
          <Image src={record.avatarUrl} width={100} height={100} fallback={DEFAULT_AVATAR}/>
        </div>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      valueEnum: {
        0: {text: '女'},
        1: {text: '男'},
      },
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      valueType: 'select',
      valueEnum: {
        0: {text: '正常', status: 'success'},
        1: {text: '异常', status: 'error'},
      },
    },
    {
      title: '邀请码',
      dataIndex: 'inviteCode'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime'
    },
    {
      title: '身份',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        0: {text: '普通用户', status: 'default'},
        1: {text: '管理员', status: 'success'},
      },
    },
    // {
    //   disable: true,
    //   title: '状态',
    //   dataIndex: 'userStatus',
    //   filters: true,
    //   onFilter: true,
    //   ellipsis: true,
    //   valueType: 'select',
    //   valueEnum: {
    //     all: { text: '超长'.repeat(50) },
    //     open: {
    //       text: '未解决',
    //       status: 'Error',
    //     },
    //     closed: {
    //       text: '已解决',
    //       status: 'Success',
    //       disabled: true,
    //     },
    //     processing: {
    //       text: '解决中',
    //       status: 'Processing',
    //     },
    //   },
    // },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            {key: 'copy', name: '复制'},
            {key: 'delete', name: '删除'},
          ]}
        />,
      ],
    },
  ]
;

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: {fixed: 'right', disable: true},
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户列表"
    />
  );
};
