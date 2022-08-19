/*
 * @Author: Hongzf
 * @Date: 2022-07-27 14:04:46
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-18 17:46:07
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
      // 菜单标题
      {
        type: 'input',
        label: '菜单标题',
        prop: 'resourceTitle',
        width: '200px',
        clearable: true,
        placeholder: '请输入菜单标题',
        col: 8 // 栅格的大小
      },
      // 父级菜单
      {
        type: 'select',
        label: '父级菜单',
        prop: 'resourcePid',
        width: '200px',
        clearable: true,
        placeholder: '请选择父级菜单',
        col: 8,
        optionLabel: 'resourceTitle',
        optionValue: 'sysResourceId',
        optionKey: 'sysResourceId',
        options: []
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
        buttonLabel: '新增菜单',
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
      prop: 'resourceTitle',
      label: '菜单标题',
      width: '120px'
    },
    {
      prop: 'parentResourceTitle',
      label: '父级菜单',
      width: '120px'
    },
    {
      prop: 'resourceUrl',
      label: '资源地址',
      minWidth: '150px'
    },
    {
      prop: 'resourceSort',
      label: '菜单序号'
    },
    {
      prop: 'creatorName',
      label: '创建人'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      formatter: (row, column) => {
        const val = row.createTime
        const date = val ? _this.$moment(val).format('YYYY-MM-DD') : '';
        return date
      }
    },
    {
      prop: 'isValid',
      label: '是否启用',
      width: '100',
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
          _this.handleOpen(row);
        }
      },
      {
        id: 'delete',
        label: '删除',
        type: 'text',
        show: true,
        plain: false,
        method: (row) => {
          _this.handleDelete(row.sysResourceId)
        }
      }
    ]
  };
};
