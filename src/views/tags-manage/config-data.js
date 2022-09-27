/*
 * @Author: Hongzf
 * @Date: 2022-08-22 09:33:37
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-22 09:39:24
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
        label: '标签名称',
        prop: 'tagName',
        width: '200px',
        clearable: true,
        placeholder: '请输入标签名称',
        col: 8 // 栅格的大小
      },
      // 状态
      {
        type: 'select',
        label: '状态',
        prop: 'status',
        width: '200px',
        clearable: true,
        placeholder: '请选择状态',
        col: 8,
        optionLabel: 'label',
        optionValue: 'value',
        optionKey: 'value',
        options: _this.$dict.getDictOptions('VALID_STATUS'),
        changeSelect: optionVal => {
          _this.filterForm.status = optionVal;
        }
      }
    ],
    operates: [
      {
        type: 'primary',
        buttonLabel: '新增标签',
        btnType: 'primary',
        //   icon: 'el-icon-search',
        method: (item, index) => {
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
  // height: '380px'
};

// 表格列
export const columns = _this => {
  return [
    {
      prop: 'tagName',
      label: '标签名称'
    },
    {
      prop: 'tagDescription',
      label: '标签描述'

    },
    {
      prop: 'status',
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
          console.log('【 index 】-163', index)
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
          _this.handleDelete(row.sysTagId)
        }
      }
    ]
  };
};
