<!--
 * @Author: Hongzf
 * @Date: 2022-08-03 09:55:18
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-05 10:57:53
 * @Description: 入职岗位-下拉
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
      v-for="(item, index) in optionsList"
      :key="'staffDutyCode' + index + item.staffDutyCode"
      :label="item.staffDuty"
      :value="item.staffDutyCode"
    />
    <!-- <el-option
      v-for="item in supplierList"
      :key="item.supplierId"
      :label="item.supplierName"
      :value="item.supplierId"
    /> -->
  </el-select>
</template>
<script>
import {
  queryStaffDutyBySelect
} from '@/api/select';

// import { getSupplier } from '@/api/procurement-manage'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
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
      this.optionsList = await queryStaffDutyBySelect();
    },
    handleChange(value) {
      this.$emit('input', this.selectVal);
      this.$emit('getSelectVal', this.selectVal);
    }
  }
};
</script>
