<template>
  <div class="app-container">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="listQuery" />

    <el-dialog
      width="800px"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      @close="handleDialogClose"
    >
      <form-panel
        ref="formPanel"
        :form-config="formConfig"
        :value="temp"
        :rules="rules"
      />
      <div slot="footer" class="dialog-footer">
        <el-button
        :loading="dialogButtonLoading"
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >提交</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 表格组件 -->
    <table-component
      :data="list"
      :options="options"
      :pagination="listQuery"
      :columns="columns"
      :operates="operates"
      :listLoading="listLoading"
      @handleRowClick="handleRowClick"
      @handleSelectionChange="handleSelectionChange"
      @handleIndexChange="handleIndexChange"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import {
  querySysPost,
  sysPostStartStop,
  saveSysPost,
  updateSysPost,
  deleteSysPost
} from '@/api/sys-post.js';
import { parseTime } from '@/utils';
import tableComponent from '@/components/TableComponent';
import filterPanel from '@/components/FilterPanel';
import formPanel from '@/components/FormPanel';
const statusTypeOptions = [
  { key: '0', display_name: '启用' },
  { key: '1', display_name: '禁用' },
  { key: '', display_name: '所有' }
];
const departmentTypeOptions = [
  { key: '1', display_name: '开发部' },
  { key: '2', display_name: '财务部' },
  { key: '3', display_name: '智慧物联部' },
  { key: '4', display_name: '代理事务部' }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = statusTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: 'SysPost',
  components: { tableComponent, filterPanel, formPanel },
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
      // 弹窗表格的加载状态
      dialogButtonLoading:false,
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
            prop: 'postName',
            // width: "200px",
            label: '岗位名称',
            placeholder: '请输入岗位名称'
          },
          // {
          //   type: "select",
          //   class: "filter-item",
          //   prop: "type",
          //   // width: "200px",

          //   label: "所属部门",
          //   placeholder: "请选择所属部门",
          //   optionLabel: "display_name",
          //   optionValue: "key",
          //   optionKey: "key",
          //   options: departmentTypeOptions,
          // },

          {
            type: 'textarea',
            prop: 'remark',
            col: 24,
            label: '岗位职责',
            autopageSize: { minRows: 2, maxRows: 4 },
            placeholder: '请输入岗位职责'
          }
          // {
          //   type: "dateTimePicker",
          //   prop: "createTime",
          //   label: "创建时间",
          //   // width: "200px",
          //   format:'yyyy-MM-dd HH:mm:ss',
          //   valueFormat:'yyyy-MM-dd HH:mm:ss',
          //   subType: "datetime",
          //   placeholder: "请选择创建时间",
          //   clearable: false,
          // },
          // {
          //   type: "input",
          //   prop: "createdPerson",
          //   label: "创建人",
          //   // width: "200px",
          //   class: "filter-item",
          //   placeholder: "请输入创建人",
          // },
        ]
      },

      filterConfig: {
        inline: false,
        gutter: 5, // 栅格的间隔
        col: 6, // 栅格的格数
        operateCol: 24,
        labelWidth: '80px',
        labelPosition: 'left',
        filterList: [
          {
            type: 'input',
            label: '岗位名称',
            prop: 'postName',
            width: '200px',
            clearable: false,
            placeholder: '请输入岗位职责',
            col: 8
          },
          // {
          //   type: "select",
          //   label: "所属部门",
          //   prop: "type",
          //   width: "200px",
          //   col: 8,
          //   optionLabel: "display_name",
          //   optionValue: "key",
          //   optionKey: "key",
          //   options: departmentTypeOptions,
          //   changeSelect: (optionVal, item, index) => {
          //     console.log(optionVal, item, index);
          //   },
          // },
          {
            type: 'select',
            label: '状态',
            prop: 'status',
            col: 8,
            width: '200px',
            clearable:true,
            placeholder:'请选择状态',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: statusTypeOptions,
            changeSelect: (optionVal, item, index) => {
              this.listQuery.status=optionVal
            }
          }
        ],
        operates: [
          {
            type: 'primary',
            buttonLabel: '新增岗位',
            btnType: 'primary',
            //   icon: 'el-icon-search',
            method: (item, index) => {
              this.handleAdd();
            }
          },
          {
            type: 'primary',
            buttonLabel: '查询',
            btnType: 'primary',
            //   icon: 'el-icon-edit',
            method: (item, index) => {
              this.getList();
            }
          },
          {
            type: 'primary',
            buttonLabel: '重置',
            btnType: 'primary',
            plain: true,
            //   icon: 'el-icon-download',
            method: (item, index) => {
              this.resetListQuery();
            }
          }
        ]
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
          prop: 'count',
          label: '序号',
          align: 'center',
          width: '80'
        },
        {
          prop: 'postName',
          label: '岗位名称',
          align: 'center',
          width: '150'
        },
        {
          prop: 'remark',
          label: '岗位职责'
        },
        {
          prop: 'createBy',
          label: '创建人',
          width: '110'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: '110'
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          width: '100',
          component: 'switch',
          method: (row, status) => {
            this.handleModifyStatus(row, status);
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
      totalRecord: 0,
      listLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        totalRecord: 0,
        postName: '',
        status: ''
      },
      importanceOptions: [1, 2, 3],
      statusTypeOptions,
      departmentTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        createBy: '',
        createTime: '',
        postCode: '',
        postId: '',
        postName:null,
        postSort: 0,
        remark: '',
        status: '0',
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
        postName: [
          { required: true, message: '请输入岗位名称', trigger: 'change' }
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
      console.log('val:', val);
    },
    // 编辑
    handleEdit(index, row) {
      console.log(' index:', index);
      console.log(' row:', row);
    },
    // 发布
    handlePush(index, row) {
      console.log(' index:', index);
      console.log(' row:', row);
    },
    // 删除
    handleDel(index, row) {
      console.log(' index:', index);
      console.log(' row:', row);
    },
    handleRowClick(val) {
      console.log(val);
    },
    handleIndexChange(currentPage) {
      this.listQuery.currentPage = currentPage;
      this.getList();
    },
    handleSizeChange(pageSize) {
      this.listQuery.pageSize = pageSize;
      this.getList();
    },
    changePagination() {},
    getList() {
      this.listLoading = true;
      querySysPost(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.list.forEach((item, index) => {
          item.count = (this.listQuery.currentPage - 1) * this.listQuery.pageSize + index+1
          item.status=item.status==='0'?true:false
        })
        this.totalRecord = response.data.totalRecord;
        this.listQuery.totalRecord = response.data.totalRecord;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },

    resetListQuery() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        totalRecord: 0,
        postName: '',
        status: ''
      };
      this.getList()
    },
    // getList() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['formPanel'].$refs['dataForm'].clearValidate()
    //   });
    // },
    handleModifyStatus(row, status) {
      const params=Object.assign({},row,{status:row.status?'0':'1'})
      sysPostStartStop(params).then((res) => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      }).catch((err) => {
        this.$message({
          message: '操作失败',
          type: 'error'
        });
      })
    },
    handleAdd() {
      // this.temp = Object.assign({}, row); // copy obj
      // this.temp.createTime = parseTime(new Date());
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['formPanel'].$refs['dataForm'].clearValidate();
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['formPanel'].$refs['dataForm'].clearValidate();
      });
    },
    createData() {
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          //   this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          //   this.temp.author = 'vue-element-admin'
          this.dialogButtonLoading=true
          saveSysPost(this.temp)
            .then((res) => {
              // this.list.unshift(this.temp);
              this.dialogFormVisible = false;
              this.handleResetForm()
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 0
              });
              this.dialogButtonLoading=false

              this.getList()
            })
            .catch((err) => {
              this.$message({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 2000
              });
            });
        }
      });
    },
    updateData() {
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp,{status:this.temp.status?'0':'1'});
          updateSysPost(tempData)
            .then(() => {
              this.$message({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              });
              this.handleResetForm()
              this.dialogFormVisible = false;
              this.getList()
            })
            .catch((err) => {
              this.$message({
                title: '失败',
                message: '修改失败',
                type: 'error',
                duration: 2000
              });
            });
        }
      });
    },
    handleDelete(row, index) {
      this.$confirm(
        '您确定要删除该岗位信息吗?删除后该岗位信息不可恢复',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          deleteSysPost(row.postId)
            .then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList()
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleResetForm() {
      this.temp = {
        createBy: '',
        createTime: '',
        postCode: '',
        postId: 0,
        postName: '',
        postSort: 0,
        remark: '',
        status: '',
      };
    },
    handleDialogClose() {
      // this.handleResetForm();
      this.$refs['formPanel'].$refs['dataForm'].clearValidate();
    },
  }
};
</script>
<style lang="scss" scope>
.limitHeight .el-textarea__inner {
  height: 36px;
}
</style>
