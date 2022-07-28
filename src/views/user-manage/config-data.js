/*
 * @Author: Hongzf
 * @Date: 2022-07-27 14:04:46
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-27 14:35:28
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
