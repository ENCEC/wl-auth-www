<template>
  <div class="demo-container">
    <el-associate
      v-model="value"
      :columns="columns"
      :display-init="display"
      value-prop="id"
      label-prop="cname"
      :query-method="queryMethod"
      multiple
      clearable
      @change="onChange"
    />
    <div>{{ value }}</div>
    <div>{{ display }}</div>
  </div>
</template>

<script>
import request from "@/utils/request"
export default {
  data() {
    return {
      value: 1,
      display:"左俊涛",
      columns: [
        {
          title: "姓名",
          field: "cname",
        },{
          title: "性别",
          field: "gender",
        },
        {
          title: "英文名",
          field: "name",
          format:value=>value&&value.toUpperCase()
        },
        {
          title: "籍贯",
          field: "city",
        },
        {
          title: "生日",
          field: "birthday",
        },
      ],
      queryMethod({
        keyword,pageSize,currentPage
      }){
        return request({
          url:'/demo/users',
          method:"get",
          params:{
            keyword,pageSize,currentPage
          }
        })
      }
    };
  },
  created() {
  },
  methods: {
    onChange(value,selectedRows){
      debugger
      this.display=selectedRows&&selectedRows.map(item=>item.cname)
    }
  },
};
</script>

<style>
</style>

