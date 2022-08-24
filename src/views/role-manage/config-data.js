/*
 * @Author: Hongzf
 * @Date: 2022-07-27 17:05:05
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-24 11:23:20
 * @Description:
 */

export const filterConfig = _this => {
  return {
    inline: false,
    gutter: 3, // 栅格的间隔
    col: 9, // 栅格的格数
    operateCol: 12,
    labelWidth: '100px',
    filterList: [
      // 用户名
      {
        type: 'input',
        label: '角色名称',
        prop: 'roleName',
        width: '200px',
        clearable: true,
        placeholder: '请输入角色名称',
        col: 6 // 栅格的大小
      },
      // 状态
      {
        type: 'select',
        label: '状态',
        prop: 'isValid',
        width: '200px',
        clearable: true,
        placeholder: '请选择状态',
        col: 6,
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
        buttonLabel: '新增角色',
        btnType: 'primary',
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
  pagination: true,
  height: '400px'
};

// 表格列
export const columns = _this => {
  return [
    {
      prop: 'roleName',
      label: '角色名称'
    },
    {
      prop: 'remark',
      label: '角色描述'

    },
    {
      prop: 'creatorName',
      label: '创建人',
      width: '120px'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      width: '120px',
      formatter: (row, column) => {
        const val = row.createTime
        const date = val ? _this.$moment(val).format('YYYY-MM-DD') : '';
        return date
      }
    },
    {
      prop: 'isValid',
      label: '是否启用',
      width: '120px',
      component: 'switch',
      method: (row) => {
        _this.changeStatus(row);
      }
    }
  ];
};

export const operates = _this => {
  return {
    fixed: false,
    width: 200,
    list: [
      {
        id: 'edit',
        label: '编辑',
        type: 'text',
        show: true,
        disabled: false,
        method: (row, index) => {
          _this.handleOpen(row, 'edit');
        }
      },
      {
        id: 'detail',
        label: '查看',
        type: 'text',
        show: true,
        disabled: false,
        method: (row, index) => {
          _this.handleOpen(row, 'detail');
        }
      },
      {
        id: 'delete',
        label: '删除',
        type: 'text',
        show: true,
        plain: false,
        method: (row) => {
          _this.handleDelete(row.sysRoleId)
        }
      }
    ]
  };
};
