<template>
<div id="root">
  <el-associate
    v-model="selected"
    :columns="columns"
    clearable
    valueProp="id"
    labelProp="name"
    :queryMethod="queryMethod"
    :focusOnClear="false"
    :multiple="true"
  ></el-associate>
</div>
</template>

<script>

import ds from '@/daoService/DaoServiceClientES6Adapter'

ds.client.config({
  serverUrl: 'http://localhost:8081/ec-demo/',
  projectKey: 'daoservice-quickstart',
  serviceCode: 'QS',
  excelImportConfig: {
    filter: 'csv,xls,xlsx', // 文件类型过滤器
    maxsize: 10, // 文件上传大小限制，单位：M
  },
});

export default {
  name: "myVue",
  data() {
    return {
      selected: [],
      columns: [
        { title: '姓名', field: 'name', width: 160 },
        { title: '邮件', field: 'email', width: 200 }
      ]
    }
  },
  methods: {
    async queryMethod({keyword, pageSize, currentPage}) {
      let student = ds.QStudent
      let {success, data} = await student
        .select(student.id, student.name, student.email)
        .where(student.name._like$_(keyword).or(student.email._like$_(keyword)))
        .paging(currentPage, pageSize)
        .execute()
      console.log(`keyword:${keyword}, status:${success}, data:`)
      console.log(data)
      if (success) {
        return data || {}
      } else {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">

#root {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
}

</style>
