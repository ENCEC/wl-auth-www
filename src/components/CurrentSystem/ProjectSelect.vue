<!--
 * @Author: Hongzf
 * @Date: 2022-08-11 09:56:10
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-12 09:37:46
 * @Description: 归属项目-下拉
-->

<template>
  <el-select
    v-model="selectVal"
    v-bind="$attrs"
    filterable
    clearable
    v-on="$listeners"
    @change="handleChange"
  >
    <el-option
      v-for="(item, index) in optionsList"
      :key="'projectId' + index + item.projectId"
      :label="item.projectName"
      :value="item.projectId"
    />
  </el-select>
</template>
<script>
import {
  queryProjectNameBySelect
} from '@/api/select';
export default {
  props: {},
  data() {
    return {
      selectVal: this.value || '', // 选择的值
      optionsList: []
    };
  },
  watch: {
    value(newVal) {
      this.selectVal = newVal
    }
  },
  created() {
    this.getSelectOptions();
  },
  mounted() {},
  methods: {
    // 获取下拉信息
    async getSelectOptions() {
      this.optionsList = await queryProjectNameBySelect();
    },
    handleChange(value) {
      this.$emit('input', value);
      this.$emit('getSelectVal', value);
      // this.$emit('input', this.selectVal);
      // this.$emit('getSelectVal', this.selectVal);
    }
  }
};
</script>
