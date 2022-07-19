<template>
  <div id="root">
    <div class="btn-group">
      <el-button @click="exportExcel">导出Excel</el-button>
      <el-button @click="importExcel">导入Excel</el-button>
    </div>
    <div id="table-wrapper">
      <el-table
        :data="tableData"
        :columns="columns"
        border
        style="width: 80%"
      >
        <el-table-column
          v-for="column in columns"
          v-bind="column"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
        ></el-table-column>
      </el-table>
      <el-pagination
        v-model="page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size.sync="pageSize"
        :current-page.sync="page"
        @current-change="loadPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>

import ds, {dsc} from '@/daoService/DaoServiceClientES6Adapter'

ds.client.config({
  serverUrl: 'http://localhost:8081/ec-demo/',
  projectKey: 'daoservice-quickstart',
  serviceCode: 'QS',
  excelImportConfig: {
    filter: 'csv,xls,xlsx',              // 文件类型过滤器
    maxsize: 10                          // 文件上传大小限制，单位：M
  }
})

const teacher = ds.QTeacher.using(ds.client)
const student = ds.QStudent.using(ds.client)

export default {
  methods: {
    exportExcel: function () {
      dsc.withModel(student)
        .forExport(student.name, student.age, student.email, student.birthday, student.teacherId)
        .dataSourceBeanName("quickstartDataSource")
        .where(student.age.eq$(18))
        .paging(this.page, this.pageSize)
        .tag("export_studentht_info")
        .async(false)
        .execute((data) => {
          console.log(data)
        })
    },
    importExcel: function () {
      dsc.forImport()
        .tag('import_studentht_info')
        .execute(
          async (data) => {
            console.log(data)
            if (!data.invalidMessages || data.invalidMessages.length === 0) {
              await this.$message({
                message: '上传成功',
                type: 'success',
                duration: 5 * 1000
              })
              this.$router.go(0)
            } else {
              for (let invalidMessage of data.invalidMessages) {
                await this.$message({
                  message: `在记录行${invalidMessage.recordIndex}，列${invalidMessage.invalidPath}上校验错误：${invalidMessage.message}`,
                  type: 'error',
                  duration: 5 * 1000
                })
              }
            }
          })
    },
    loadPage: function () {
      console.log(this.page)
      student
        .select(student.name, student.age, student.email, student.birthday, student.teachers.teacherName)
        .where(student.age.eq$(18))
        .paging(this.page, this.pageSize)
        .execute()
        .then(resp => {
          if (resp.success && resp.data) {
            this.tableData = resp.data.records
            this.total = resp.data.totalRecord
          }
          console.log(resp)
        })
    }
  },
  async mounted() {
    this.loadPage()
  },
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 5,
      tableData: [],
      columns: {
        name: {
          prop: 'name',
          label: '学生姓名'
        },
        sex: {
          prop: 'age',
          label: '学生年龄'
        },
        email: {
          prop: 'email',
          label: '邮箱'
        },
        birthday: {
          prop: 'birthday',
          label: '出生日期'
        },
        teacherName: {
          prop: 'Student$Teacher$teacherName',
          label: '教师姓名'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

#root {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;

  .btn-group {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 80%;
  }

  #table-wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .el-table {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
