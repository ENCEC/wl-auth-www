/*
 * @Author: Hongzf
 * @Date: 2022-07-27 14:04:46
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 12:23:30
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
