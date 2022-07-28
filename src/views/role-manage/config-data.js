/*
 * @Author: Hongzf
 * @Date: 2022-07-27 17:05:05
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-28 10:37:29
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
        prop: 'account',
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
