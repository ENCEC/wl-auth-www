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
      :list-loading="listLoading"
      @handleRowClick="handleRowClick"
      @handleSelectionChange="handleSelectionChange"
      @handleIndexChange="handleIndexChange"
    />

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{
          $t("table.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  querySysPost
} from '@/api/sys-post.js';
import {
  queryByTechnicalTitleName,
  updateStatus,
  saveSysTechnicalTitle,
  updateSysTechnicalTitle,
  deleteSysTechnicalTitle
} from '@/api/sys-technical-title.js';
import tableComponent from '@/components/TableComponent';
import filterPanel from '@/components/FilterPanel';
import formPanel from '@/components/FormPanel';
const statusTypeOptions = [
  { key: '0', display_name: '启用' },
  { key: '1', display_name: '禁用' },
  { key: '', display_name: '所有' }
];
const postTypeOptions = [
];

export default {
  name: 'SysTechniclTitle',
  components: { tableComponent, filterPanel, formPanel },
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
            prop: 'technicalName',
            // width: "200px",
            label: '职称名称',
            placeholder: '请输入职称名称'
          },
          {
            type: 'select',
            class: 'filter-item',
            prop: 'postName',
            // width: "200px",

            label: '所属岗位',
            placeholder: '请选择所属岗位',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: postTypeOptions
          },

          {
            type: 'input',
            prop: 'seniority',
            label: '工作年限',
            placeholder: '请输入工作年限'
          }
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
            label: '职称名称',
            prop: 'technicalName',
            width: '200px',
            clearable: false,
            placeholder: '请输入职称名称',
            col: 8
          },
          {
            type: 'select',
            label: '所属岗位',
            prop: 'postName',
            width: '200px',
            col: 8,
            clearable: true,
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: postTypeOptions,
            changeSelect: (optionVal) => {
              this.listQuery.postName = optionVal
            }
          },
          {
            type: 'select',
            label: '状态',
            prop: 'status',
            col: 8,
            width: '200px',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: statusTypeOptions,
            changeSelect: (optionVal) => {
              this.listQuery.status = optionVal
            }
          }
        ],
        operates: [
          {
            type: 'primary',
            buttonLabel: '新增职称',
            btnType: 'primary',
            //   icon: 'el-icon-search',
            method: () => {
              this.handleAdd();
            }
          },
          {
            type: 'primary',
            buttonLabel: '查询',
            btnType: 'primary',
            //   icon: 'el-icon-edit',
            method: () => {
              this.getList();
            }
          },
          {
            type: 'primary',
            buttonLabel: '重置',
            btnType: 'primary',
            plain: true,
            //   icon: 'el-icon-download',
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
          prop: 'technicalName',
          label: '职称名称',
          align: 'center',
          width: '150'
        },
        {
          prop: 'postName',
          label: '所属岗位'
        },
        {
          prop: 'seniority',
          label: '工作年限'
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
              this.handleDelete(row);
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
        currentPage: 1,
        pageSize: 20,
        totalRecord: 0,
        technicalName: '',
        postName: '',
        status: ''
      },
      statusTypeOptions,
      postTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        technicalTitleId: 0,
        createBy: '',
        createTime: 0,
        postId: 0,
        remark: '',
        seniority: '',
        status: '0',
        technicalName: '',
        updateBy: '',
        updateTime: '',
        postName: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑职称',
        create: '新增职称'
      },
      dialogPvVisible: false,
      rules: {
        technicalName: [
          { required: true, message: '请输入职称名称', trigger: 'change' }
        ],
        postName: [
          { required: true, message: '请选择所属岗位', trigger: 'change' }
        ],
        seniority: [
          { required: true, message: '请输入工作年限', trigger: 'change' }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
    this.initPostSelect()
  },
  methods: {
    initPostSelect() {
      const params = {
        pageSize: 1000,
        currentPage: 1,
        status: '0'
      }
      querySysPost(params).then((res) => {
        res.data.records.filter((item) => {
          return item.status === '0'
        }).forEach((item) => {
          this.postTypeOptions.push({ key: item.postName, display_name: item.postName })
        })
      }).catch(() => {
        this.$message.error('初始化岗位失败')
      })
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
      queryByTechnicalTitleName(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.list.forEach((item, index) => {
          item.count = (this.listQuery.currentPage - 1) * this.listQuery.pageSize + index + 1
          item.status = item.status === '0'
        });
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
        technicalName: '',
        postName: '',
        status: ''
      };
      this.getList();
    },
    // getList() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['formPanel'].$refs['dataForm'].clearValidate()
    //   });
    // },
    handleModifyStatus(row) {
      const params = Object.assign({}, row, { status: row.status ? '0' : '1' })
      debugger
      updateStatus(params)
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
      // this.temp = Object.assign({}, row); // copy obj
      // this.temp.createTime = parseTime(new Date());
      console.log(this.temp.createTime);
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['formPanel'].$refs['dataForm'].clearValidate();
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      debugger
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
          saveSysTechnicalTitle(this.temp)
            .then(() => {
              debugger;
              // this.list.unshift(this.temp);
              this.dialogFormVisible = false;
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
              this.getList()
            })
            .catch(() => {
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
      debugger
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp, { status: this.temp.status ? '0' : '1' });
          debugger
          updateSysTechnicalTitle(tempData)
            .then(() => {
              this.dialogFormVisible = false;
              this.$message({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              });
              this.getList()
            })
            .catch(() => {
              debugger
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
    handleDelete(row) {
      debugger
      this.$confirm(
        '您确定要删除该职称信息吗?删除后该职称信息不可恢复',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const _this = this
          deleteSysTechnicalTitle(row.technicalTitleId)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              _this.getList()
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
        technicalTitleId: 0,
        createBy: '',
        createTime: 0,
        postId: 0,
        remark: '',
        seniority: '',
        status: '0',
        technicalName: '',
        updateBy: '',
        updateTime: '',
        postName: ''
      };
    },
    handleDialogClose() {
      // this.handleResetForm();
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
