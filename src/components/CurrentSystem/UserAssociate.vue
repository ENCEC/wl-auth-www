<!--
 * @Author: Hongzf
 * @Date: 2022-08-03 10:20:28
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-03 16:13:44
 * @Description:联想控件-用户
-->

<template>
  <el-associate
    v-model="selectVal"
    v-bind="$attrs"
    :columns="associateColumns"
    value-prop="uemUserId"
    label-prop="name"
    clearable
    :query-method="queryMethod"
    :disabled="disabled"
    v-on="$listeners"
    @change="handleChange"
  />
  <!-- <el-select
    v-model="selectVal"
    filterable
    placeholder="请选择"
    clearable
    :disabled="disabled"
    @change="handleChange"
  >
    <el-option
      v-for="(item, index) in optionsList"
      :key="'staffDutyCode' + index + item.staffDutyCode"
      :label="item.staffDuty"
      :value="item.staffDutyCode"
    /> -->
  <!-- <el-option
      v-for="item in supplierList"
      :key="item.supplierId"
      :label="item.supplierName"
      :value="item.supplierId"
    /> -->
  <!-- </el-select> -->
</template>
<script>
import {
  queryUser
} from '@/api/select';
// import { getSupplier } from '@/api/procurement-manage'
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
      optionsList: [],
      associateColumns: [
        {
          title: '姓名',
          field: 'name'
        }
        // {
        //   title: '教师性别',
        //   field: 'sex'
        // }
      ],
      queryMethod({
        keyword,
        pageSize,
        currentPage

      }) {
        console.log('【  pageSize,currentPage 】-108', pageSize, currentPage)
        return new Promise((resolve) => {
          queryUser({
            name: keyword,
            pageSize,
            pageNo: currentPage
          }).then((res) => {
            // console.log('【 res 】-111', res)
            const records = res.records
            resolve({
              records,
              total: res.totalRecord
            });
          });
        }).catch((err) => {
          console.log(err);
        });
      }
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
      // this.optionsList = await queryStaffDutyBySelect();
    },
    handleChange(value) {
      this.$emit('input', this.selectVal);
      this.$emit('getSelectVal', this.selectVal);
    }
  }
};
</script>
