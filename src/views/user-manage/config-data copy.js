/*
 * @Author: Hongzf
 * @Date: 2022-07-27 14:04:46
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 11:08:54
 * @Description:
 */
export const filterConfig = _this => {
  return {
    inline: false,
    gutter: 3, // 栅格的间隔
    col: 9, // 栅格的格数
    operateCol: 24,
    labelWidth: '100px',
    filterList: [
      // 用户名
      {
        type: 'input',
        label: '用户名',
        prop: 'account',
        width: '200px',
        clearable: true,
        placeholder: '请输入用户名',
        col: 8 // 栅格的大小
      },
      {
        type: 'input',
        label: '姓名',
        prop: 'name',
        width: '200px',
        clearable: true,
        placeholder: '请输入姓名',
        col: 8
      },
      // 状态
      {
        type: 'select',
        label: '状态',
        prop: 'isValid',
        width: '200px',
        clearable: true,
        placeholder: '请选择状态',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: [
          {
            value: true,
            label: '启用'
          },
          {
            value: false,
            label: '禁用'
          }
        ]
      }
      // {
      //   type: 'radio',
      //   label: '状态',
      //   prop: 'status',
      //   col: 8,
      //   radioArr: [
      //     {
      //       label: '启用',
      //       disabled: false
      //     },
      //     {
      //       label: '禁用',
      //       disabled: false
      //     }
      //   ],
      //   changeSelect: (optionVal, item, index) => {
      //     console.log(optionVal, item, index)
      //   }
      // }
    ],
    operates: [
      {
        type: 'primary',
        buttonLabel: '新增用户',
        btnType: 'primary',
        //   icon: 'el-icon-search',
        method: (item, index) => {
          console.log('【 item, index 】-88', item, index);
          _this.handleOpen();
        }
      },
      {
        type: 'primary',
        buttonLabel: '查询',
        btnType: 'primary',
        method: () => {
          _this.handleQuery();
        }
      },
      {
        type: 'primary',
        buttonLabel: '重置',
        btnType: 'primary',
        plain: true,
        method: () => {
          _this.resetQueryForm(_this.filterForm);
        }
      }
    ]
  };
};

export const options = {
  border: true,
  stripe: true, // 是否为斑马纹 table
  loading: false, // 是否添加表格loading加载动画
  highlightCurrentRow: true, // 是否支持当前行高亮显示
  mutiSelect: false, // 是否支持列表项选中功能
  pagination: true
}; // table 的参数

export const columns = _this => {
  return [
    {
      prop: 'count',
      label: '序号',
      align: 'center',
      width: '80'
    },
    {
      prop: 'account',
      label: '用户名',
      align: 'center',
      width: '150'
    },
    {
      prop: 'remark',
      label: '岗位职责'
    },
    {
      prop: 'createBy',
      label: '创建人',
      width: '110'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      width: '110'
    },
    {
      prop: 'status',
      label: '状态',
      align: 'center',
      width: '100',
      component: 'switch',
      method: (row, status) => {
        _this.handleModifyStatus(row, status);
      }
    }
  ]; // 需要展示的列
};
export const operates = _this => {
  return {
    list: [
      {
        id: '1',
        label: '编辑',
        type: 'text',
        show: true,
        // icon: 'el-icon-edit',
        // plain: true,
        disabled: false,
        method: (index, row) => {
          _this.handleUpdate(row);
        }
      },
      {
        id: '2',
        label: '删除',
        type: 'text',
        // icon: 'el-icon-delete',
        // show: (index, row) => {
        //   return row.status !== 'draft'
        // },
        show: true,
        plain: false,
        method: (index, row) => {
          _this.handleDelete(row);
        }
      }
      //   {
      //     id: '3',
      //     label: '删除',
      //     type: 'danger',
      //     icon: 'el-icon-delete',
      //     show: true,
      //     plain: false,
      //     disabled: false,
      //     method: (index, row) => {
      //       _this.handleDelete(row)
      //     }
      //   }
    ],
    fixed: false,
    width: 230
  }; // 列操作按钮
};
