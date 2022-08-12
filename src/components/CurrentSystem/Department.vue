<!--
 * @Author: Hongzf
 * @Date: 2022-08-04 17:34:53
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-05 11:00:28
 * @Description: 所属部门-下拉
-->

<template>
  <el-select
    v-model="selectVal"
    v-bind="$attrs"
    filterable
    clearable
    :disabled="disabled"
    v-on="$listeners"
    @change="handleChange"
  >
    <el-option
      v-for="(item,index) in optionsList"
      :key="'deptId'+index+item.uemDeptId"
      :label="item.deptName"
      :value="item.uemDeptId"
    />
  </el-select>
</template>
<script>
import {
  queryDepartmentBySelect
} from '@/api/select';

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
    // value: {
    //   type: String, // 传入的值
    //   require: true
    // }
  },
  data() {
    return {
      selectVal: this.value || '', // 选择的值
      optionsList: []
    };
  },
  watch: {
    value(newVal) {
      this.selectVal = this.value;
    }
  },
  created() {
    this.getSelectOptions();
  },
  mounted() {},
  methods: {
    // 获取下拉信息
    async getSelectOptions() {
      this.optionsList = await queryDepartmentBySelect();
    },
    handleChange(value) {
      this.$emit('input', this.selectVal);
      this.$emit('getSelectVal', this.selectVal);
    }
  }
};
</script>
