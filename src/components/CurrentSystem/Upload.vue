<!--
 * @Author: Hongzf
 * @Date: 2022-08-04 17:34:53
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-05 14:13:10
 * @Description: 所属部门-下拉
-->

<template>
  <el-upload
    size="mini"
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
  </el-upload>
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
      optionsList: [],
      fileList: []
      // fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
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
