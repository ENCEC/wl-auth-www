/*
 * @Author: Hongzf
 * @Date: 2022-07-28 10:47:20
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-29 17:51:33
 * @Description:
 */

export const filterConfig = _this => {
  return {
    inline: false,
    gutter: 4, // 栅格的间隔
    col: 2, // 栅格的格数
    operateCol: 14,
    labelWidth: '10px',
    filterList: [
      // 用户名
      {
        type: 'input',
        label: '',
        // size: 'small',
        prop: 'account',
        width: '150px',
        clearable: true,
        placeholder: '请输入用户名',
        class: {
          marginRight: '100px !important'
        },
        col: 10// 栅格的大小
      }
    ],
    operates: [
      {
        type: 'primary',
        // size: 'small',
        buttonLabel: '查询',
        btnType: 'primary',
        method: () => {
          _this.handleQuery();
        }
      },
      {
        type: 'primary',
        // size: 'small',
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
