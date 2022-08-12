/*
 * @Author: Hongzf
 * @Date: 2022-08-05 17:38:09
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-09 14:05:28
 * @Description:
 */

export const formRules = {
  account: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      message: '请输入联系电话',
      trigger: 'blur'
    },
    {
      pattern: /^1(3|4|5|7|8|9)\d{9}$/,
      message: '手机号格式错误',
      trigger: 'blur'
    }
  ],
  sex: [
    {
      required: true,
      message: '性别不能为空',
      trigger: 'change'
    }
  ],
  email: [
    {
      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: '电子邮箱格式错误',
      trigger: 'blur'
    }
  ],
  userType: [
    {
      required: true,
      message: '请选择用户类型',
      trigger: 'change'
    }
  ],
  deptName: [
    {
      required: true,
      message: '请选择所属部门',
      trigger: 'change'
    }
  ]
};
