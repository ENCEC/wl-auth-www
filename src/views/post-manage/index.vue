<template>
  <div class="app-container">

    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="listQuery" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <form-panel ref="formPanel" :form-config="formConfig" :value="temp" :rules="rules" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 表格组件 -->
    <table-component
      :data="list"
      :options="options"
      :pagination="listQuery"
      :columns="columns"
      :operates="operates"
      @handleRowClick="handleRowClick"
      @handleSelectionChange="handleSelectionChange"
      @handleIndexChange="handleIndexChange"
    />

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import tableComponent from '@/components/TableComponent'
import filterPanel from '@/components/FilterPanel'
import formPanel from '@/components/FormPanel'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
];
const departmentTypeOptions = [
  { key: '1', display_name: '开发部' },
  { key: '2', display_name: '财务部' },
  { key: '3', display_name: '智慧物联部' },
  { key: '4', display_name: '代理事务部' }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { tableComponent, filterPanel, formPanel },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      formConfig: {
        inline: false,
        col: 12,
        labelPosition: 'left',
        ref: 'dataForm',
        labelWidth: '80px',
        style: 'width: 100%;',
        formItemList: [
          {
            type: 'input',
            prop: 'name',
            width: '200px',
            label: '岗位名称',
            placeholder: '请输入岗位名称'
          },
          {
            type: 'select',
            class: 'filter-item',
            prop: 'type',
            width: '200px',

            label: '所属部门',
            placeholder: '请选择所属部门',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: departmentTypeOptions
          },

          {
            type: 'textarea',
            prop: 'duty',
            col: 24,
            label: '岗位职责',
            autosize: { minRows: 2, maxRows: 4 },
            placeholder: '请输入岗位职责'
          }, {
            type: 'dateTimePicker',
            prop: 'timestamp',
            label: '创建时间',
            width: '200px',
            subType: 'datetime',
            placeholder: '请选择创建时间',
            clearable: false
          }, {
            type: 'input',
            prop: 'createdPerson',
            label: '创建人',
            width: '200px',

            class: 'filter-item',
            placeholder: '请输入创建人'
          }]
      },
      filterConfig: {
        inline: false,
        gutter: 5, // 栅格的间隔
        col: 6, // 栅格的格数
        operateCol: 24,
        labelWidth: '100px',
        filterList: [{
          type: 'input',
          label: '岗位名称',
          prop: 'name',
          width: '200px',
          clearable: false,
          placeholder: '123',
          col: 8
        }, {
          type: 'select',
          label: '所属部门',
          prop: 'type',
          width: '200px',
          col: 8,
          optionLabel: 'display_name',
          optionValue: 'key',
          optionKey: 'key',
          options: departmentTypeOptions,
          changeSelect: (optionVal, item, index) => {
            console.log(optionVal, item, index)
          }
        },
        {
          type: 'radio',
          label: '状态',
          prop: 'status',
          col: 8,
          radioArr: [
            {
              label: '启用',
              disabled: false
            },
            {
              label: '禁用',
              disabled: false
            }
          ],
          changeSelect: (optionVal, item, index) => {
            console.log(optionVal, item, index)
          }
        }

        ],
        operates: [{
          type: 'primary',
          buttonLabel: '新增岗位',
          btnType: 'primary',
          //   icon: 'el-icon-search',
          method: (item, index) => {
            this.handleAdd()
          }
        }, {
          type: 'primary',
          buttonLabel: '查询',
          btnType: 'primary',
          //   icon: 'el-icon-edit',
          method: (item, index) => {
            this.getList()
          }
        }, {
          type: 'primary',
          buttonLabel: '重置',
          btnType: 'primary',
          plain: true,
          //   icon: 'el-icon-download',
          method: (item, index) => {
            this.resetListQuery()
          }
        }]
      },
      tableData: [],
      options: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        pagination: true
      }, // table 的参数

      columns: [
        {
          prop: 'id',
          label: '编号',
          align: 'center',
          width: '80'
        },
        {
          prop: 'timestamp',
          label: '时间',
          align: 'center',
          width: '150',
          formatter: (row, column, cellValue) => {
            return `<span style="white-space: nowrap;color: dodgerblue;">${parseTime(
              row.timestamp,
              '{y}-{m}-{d} {h}:{i}'
            )}</span>`
          }
        },
        {
          prop: 'title',
          label: '标题'
        },
        {
          prop: 'author',
          label: '作者',
          width: '110'
        },
        {
          prop: 'reviewer',
          label: '审核人',
          width: '110'
        },
        {
          prop: 'importance',
          label: '重要性',
          width: '80',
          render: (h, params) => {
            const arr = Array.from(Array(params.row.importance), (v, k) => k); // 循环多个
            return h(
              'span',
              arr.map((item, index) => {
                return h('svg-icon', {
                  props: {
                    iconClass: 'star'
                  }, // 组件的props
                  class: 'meta-item__icon'
                });
              })
            );
          }
        },
        {
          prop: 'pageviews',
          label: '阅读数',
          width: '95'
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          width: '100',
          component: 'switch',
          method: (row) => {
            this.handleModifyStatus(row)
          }

        }
      ], // 需要展示的列
      operates: {
        list: [
          {
            id: '1',
            label: '编辑',
            type: 'text',
            show: true,
            // icon: 'el-icon-edit',
            // plain: true,
            disabled: false,
            method: (index, row) => {
              this.handleUpdate(row);
            }
          },
          {
            id: '2',
            label: '删除',
            type: 'text',
            // icon: 'el-icon-delete',
            // show: (index, row) => {
            //   return row.status !== 'draft'
            // },
            show: true,
            plain: false,
            method: (index, row) => {
              this.handleDelete(row, 'draft');
            }
          }
        //   {
        //     id: '3',
        //     label: '删除',
        //     type: 'danger',
        //     icon: 'el-icon-delete',
        //     show: true,
        //     plain: false,
        //     disabled: false,
        //     method: (index, row) => {
        //       this.handleDelete(row)
        //     }
        //   }
        ],
        fixed: false,
        width: 230
      }, // 列操作按钮

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20,
        total: 0,
        name: undefined,
        type: undefined,
        status: undefined
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      departmentTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑岗位',
        create: '新增岗位'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {

    handleSelectionChange(val) {
      console.log('val:', val)
    },
    // 编辑
    handleEdit(index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
    },
    // 发布
    handlePush(index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
    },
    // 删除
    handleDel(index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
    },
    handleRowClick(val) {
      console.log(val)
    },
    handleIndexChange(page) {
      this.listQuery.page = page
      this.getList()
    },
    handleSizeChange(size) {
      this.listQuery.size = size
      this.getList()
    },
    changePagination() {},
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listQuery.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      });
    },
    handleAdd() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      debugger
      this.$message({
        message: '操作成功',
        type: 'success'
      });
      row.status = status
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        size: 20,
        total: 0,
        name: undefined,
        type: undefined,
        status: undefined
      };
    },
    // getList() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['formPanel'].$refs['dataForm'].clearValidate()
    //   });
    // },
    createData() {
      this.$refs['formPanel'].$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formPanel'].$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formPanel'].$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      });
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      });
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status'];
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        });
        this.downloadLoading = false
      });
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      );
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
};
</script>
<style lang="scss" scope>
.limitHeight .el-textarea__inner{
  height: 36px;
}
</style>
