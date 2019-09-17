export const userColumns = [
  {
    title: "ID",
    key: "id",
    width: 80,
    align:"center"
  },
  {
    title: "登录账号",
    key: "loginName",
    minWidth: 120,
    sortable: true,
    align:"center"
  },
  {
    title: "姓名",
    key: "userName",
    minWidth: 160,
    sortable: true,
    align:"center"
  },
  {
    title: "手机号",
    key: "mobile",
    width: 120,
    align:"center"
  },
  {
    title: "邮箱",
    key: "email",
    minWidth: 160,
    sortable: true,
    align:"center"
  },
  {
    title: "角色",
    key: "roleName",
    minWidth: 130,
    align:"center",
  },
  {
    title: "状态",
    key: "status",
    minWidth: 80,
    align:"center",
    render: (h, params) => {
      return h("span", ["启用", "禁用"][params.row.status]);
    }
  },
  {
    title: "机构",
    key: "groupName",
    minWidth: 140,
    align:"center"
  },
  {
    title: "创建时间",
    key: "createDate",
    width: 160,
    align:"center"
  },
  {
    title: "操作",
    slot: "action",
    fixed: "right",
    width: 200,
    align:"center",
  }
]