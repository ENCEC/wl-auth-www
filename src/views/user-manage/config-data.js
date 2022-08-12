/*
 * @Author: Hongzf
 * @Date: 2022-07-27 14:04:46
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-11 10:45:13
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
        options: _this.$dict.getDictOptions('VALID_STATUS'),
        changeSelect: optionVal => {
          _this.filterForm.isValid = optionVal;
        }
      }
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

// table 的配置参数
export const tableConfig = {
  border: true,
  stripe: true, // 是否为斑马纹 table
  loading: false, // 是否添加表格loading加载动画
  highlightCurrentRow: true, // 是否支持当前行高亮显示
  mutiSelect: false, // 是否支持列表项选中功能
  indexShow: true,
  pagination: true
};

// 表格列
export const columns = _this => {
  return [
    {
      prop: 'account',
      label: '用户名'
    },
    {
      prop: 'name',
      label: '姓名'

    },
    {
      prop: 'mobile',
      label: '联系电话'
    },
    {
      prop: 'email',
      label: '电子邮箱'
    },
    {
      prop: 'isValid',
      label: '是否启用',
      width: '100',
      component: 'switch',
      method: (row, status) => {
        _this.changeStatus(row);
      }
    }
  ];
};

export const operates = _this => {
  return {
    list: [
      {
        id: 'edit',
        label: '编辑',
        type: 'text',
        show: true,
        disabled: false,
        method: (row, index) => {
          console.log('【 index 】-163', index)
          _this.handleOpen(row);
        }
      },
      {
        id: 'resetPassword',
        label: '重置密码',
        type: 'text',
        // icon: 'el-icon-delete',
        // show: (index, row) => {
        //   return row.status !== 'draft'
        // },
        show: true,
        plain: false,
        method: (row, index) => {
          _this.resetPassword(row.uemUserId);
        }
      },
      {
        id: 'delete',
        label: '删除',
        type: 'text',
        show: true,
        plain: false,
        method: (row, index) => {
          _this.handleDelete(row.uemUserId)
        }
      }
    ],
    fixed: false,
    width: 230
  }; // 列操作按钮
};
