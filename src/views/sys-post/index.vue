<template>
  <div class="app-container">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="listQuery" />

    <el-dialog
      width="800px"
      :title="textMap[dialogStatus]"
      :close-on-click-modal="false"
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
          size="medium"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >提交</el-button>
        <el-button
          size="medium"
          @click="dialogFormVisible = false"
        >取消</el-button>
      </div>
    </el-dialog>

    <!-- 表格组件 -->
    <table-component
      :data="list"
      :options="options"
      :pagination="listQuery"
      :columns="columns"
      :operates="operates"
      :list-loading="listLoading"
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
      dialogButtonLoading: false,
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
          {
            type: 'textarea',
            prop: 'remark',
            col: 24,
            label: '岗位职责',
            autopageSize: { minRows: 2, maxRows: 4 },
            placeholder: '请输入岗位职责'
          }
        ]
      },

      filterConfig: {
        inline: false,
        gutter: 5, // 栅格的间隔
        col: 6, // 栅格的格数
        operateCol: 8,
        labelWidth: '100px',
        labelPosition: 'right',
        filterList: [
          {
            type: 'input',
            label: '岗位名称',
            prop: 'postName',
            width: '200px',
            clearable: false,
            placeholder: '请输入岗位名称',
            col: 8
          },
          {
            type: 'select',
            label: '状态',
            prop: 'status',
            labelWidth: '40px',
            col: 8,
            width: '200px',
            clearable: true,
            placeholder: '请选择状态',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: statusTypeOptions,
            changeSelect: (optionVal) => {
              this.listQuery.status = optionVal;
            }
          }
        ],
        operates: [
          {
            type: 'primary',
            buttonLabel: '新增岗位',
            btnType: 'primary',
            method: () => {
              this.handleAdd();
            }
          },
          {
            type: 'primary',
            buttonLabel: '查询',
            btnType: 'primary',
            method: () => {
              this.getList();
            }
          },
          {
            type: 'primary',
            buttonLabel: '重置',
            btnType: 'primary',
            plain: true,
            method: () => {
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
          align: 'center'
        },
        {
          prop: 'remark',
          label: '岗位职责'
        },
        {
          prop: 'createBy',
          label: '创建人'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          formatter: (row) => {
            return row.createTime.substring(0, 11);
          }
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
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
            disabled: false,
            method: (row) => {
              this.handleUpdate(row);
            }
          },
          {
            id: '2',
            label: '删除',
            type: 'text',
            show: true,
            plain: false,
            method: (row) => {
              this.handleDelete(row);
            }
          }
        ],
        fixed: false,
        width: 200
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
        postName: null,
        postSort: 0,
        remark: '',
        status: '0'
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
          item.count =
            (this.listQuery.currentPage - 1) * this.listQuery.pageSize +
            index +
            1;
          item.status = item.status === '0';
        });
        this.totalRecord = response.data.totalRecord;
        this.listQuery.totalRecord = response.data.totalRecord;
        this.listLoading = false;
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
      this.getList();
    },
    handleModifyStatus(row) {
      const params = Object.assign({}, row, { status: row.status ? '0' : '1' });
      sysPostStartStop(params)
        .then(() => {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        })
        .catch(() => {
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        });
    },
    handleAdd() {
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
          this.dialogButtonLoading = true;
          saveSysPost(this.temp)
            .then((res) => {
              if (!res.success) {
                this.$message.error(
                  res.errorMessages ? res.errorMessages[0] : '创建失败'
                );
                this.dialogButtonLoading = false;
                return;
              }
              this.dialogFormVisible = false;
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
              this.dialogButtonLoading = false;

              this.getList();
            })
            .catch(() => {
              this.$message({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 2000
              });
              this.dialogButtonLoading = false;
            });
        }
      });
    },
    updateData() {
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogButtonLoading = true;
          const tempData = Object.assign({}, this.temp, {
            status: this.temp.status ? '0' : '1'
          });
          updateSysPost(tempData)
            .then((res) => {
              if (!res.success) {
                this.$message.error(
                  res.errorMessages ? res.errorMessages[0] : '修改失败'
                );
                this.dialogButtonLoading = false;
                return;
              }
              this.$message({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              });
              this.dialogFormVisible = false;
              this.dialogButtonLoading = false;
              this.getList();
            })
            .catch(() => {
              this.$message({
                title: '失败',
                message: '修改失败',
                type: 'error',
                duration: 2000
              });
              this.dialogButtonLoading = false;
            });
        }
      });
    },
    handleDelete(row) {
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
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList();
            })
            .catch(() => {
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
        status: ''
      };
    },
    handleDialogClose() {
      this.$nextTick(() => {
        this.handleResetForm();
      });
      this.$refs['formPanel'].$refs['dataForm'].clearValidate();
    }
  }
};
</script>
<style lang="scss" scope>
.limitHeight .el-textarea__inner {
  height: 36px;
}
</style>
