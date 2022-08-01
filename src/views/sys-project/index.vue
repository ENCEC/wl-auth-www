<template>
  <div class="app-container">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="listQuery" />

    <el-dialog
      top="10vh"
      width="800px"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      @close="handleDialogClose"
    >
      <form-panel
        ref="formPanel"
        :form-config="formConfig"
        :dialog-status="dialogStatus"
        :value="temp"
        :rules="rules"
      />
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          :loading="dialogButtonLoading"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >提交</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <examine-dialog ref="examineDialog" />

    <!-- 表格组件 -->
    <table-component
      :data="list"
      :options="options"
      :pagination="listQuery"
      :columns="columns"
      :operates="operates"
      :list-loading="listLoading"
      @handleIndexChange="handleIndexChange"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import {
  queryUemProject,
  queryUemUserName,
  addUemProject,
  updateUemProject,
  deleteSysPost
} from '@/api/sys-project.js';
import tableComponent from '@/components/TableComponent';
import filterPanel from '@/components/FilterPanel';
import formPanel from '@/components/FormPanel';
import examineDialog from './component/examine-dialog';
const projectStatusOptions = [
  { key: 0, display_name: '未开始' },
  { key: 1, display_name: '进行中' },
  { key: 2, display_name: '暂停中' },
  { key: 3, display_name: '已完成' },
  { key: 4, display_name: '延期' },
  { key: 5, display_name: '终止' }
];
const projectRolesColumns = [
  {
    title: '姓名',
    field: 'name'
  }
];
// const projectRolesQueryMethod = function({ keyword, pageSize, currentPage }) {
//   debugger
//   return new Promise((resolve, reject) => {
//     queryUemUserName({ name: keyword, pageSize, currentPage }).then((res) => {
//       console.log(res);
//       debugger;
//       resolve({
//         records: res.data.data,
//         total: res.data.total,
//         recordStart: res.data.recordStart,
//         recordEnd: res.data.recordEnd
//       });
//     });
//   });
// };

export default {
  name: 'SysProject',
  components: { tableComponent, filterPanel, formPanel, examineDialog },
  data() {
    return {
      dialogButtonLoading: false,
      formConfig: {
        inline: false,
        col: 12,
        labelPosition: 'right',
        ref: 'dataForm',
        labelWidth: '120px',
        style: 'width: 100%;',
        formItemList: [
          {
            type: 'input',
            prop: 'projectName',
            // width: "200px",
            label: '项目名称',
            placeholder: '请输入职称名称'
          },
          {
            type: 'input',
            prop: 'customer',
            // width: "200px",
            label: '客户名称',
            placeholder: '请输入客户名称'
          },
          {
            type: 'input',
            prop: 'fcy',
            // width: "200px",
            label: '项目金额',
            placeholder: '请输入项目金额'
          },

          {
            type: 'select',
            class: 'filter-item',
            prop: 'status',
            // width: "200px",

            label: '项目状态',
            placeholder: '请选择项目状态',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: projectStatusOptions
          },

          // {
          //   type: "associate",
          //   label: "项目总监",
          //   prop: "chiefName",
          //   examine: true,
          //   // width: "200px",
          //   valueProp: "name",
          //   labelProp: "name",
          //   displayInit: "name",
          //   columns: projectRolesColumns,
          //   mulitiple: true,
          //   clearable: false,
          //   queryMethod: projectRolesQueryMethod,
          //   changeSelect: (value, selectedRows) => {
          //     debugger;
          //     //   this.listQuery.status=optionVal
          //   },
          // },
          // {
          //   type: "associate",
          //   label: "项目经理",
          //   prop: "dutyName",
          //   // width: "200px",
          //   examine: true,
          //   valueProp: "name",
          //   labelProp: "name",
          //   displayInit: "name",
          //   columns: projectRolesColumns,
          //   mulitiple: true,
          //   clearable: false,
          //   queryMethod: projectRolesQueryMethod,
          //   changeSelect: (value, selectedRows) => {
          //     //   this.listQuery.status=optionVal
          //   },
          // },
          // {
          //   type: "associate",
          //   label: "开发经理",
          //   prop: "devDirectorName",
          //   // width: "200px",
          //   examine: true,
          //   valueProp: "name",
          //   labelProp: "name",
          //   displayInit: "name",
          //   columns: projectRolesColumns,
          //   mulitiple: true,
          //   clearable: false,
          //   queryMethod: projectRolesQueryMethod,
          //   changeSelect: (value, selectedRows) => {
          //     //   this.listQuery.status=optionVal
          //   },
          // },
          // {
          //   type: "associate",
          //   label: "需求组长",
          //   prop: "demandName",
          //   // width: "200px",
          //   examine: true,
          //   valueProp: "name",
          //   labelProp: "name",
          //   displayInit: "name",
          //   columns: projectRolesColumns,
          //   mulitiple: true,
          //   clearable: false,
          //   queryMethod: projectRolesQueryMethod,
          //   changeSelect: (value, selectedRows) => {
          //     //   this.listQuery.status=optionVal
          //   },
          // },
          // {
          //   type: "associate",
          //   label: "开发成员",
          //   prop: "genDevUsers",
          //   // width: "200px",
          //   examine: true,
          //   valueProp: "name",
          //   labelProp: "name",
          //   displayInit: "name",
          //   columns: projectRolesColumns,
          //   mulitiple: true,
          //   clearable: true,
          //   queryMethod: projectRolesQueryMethod,
          //   changeSelect: (value, selectedRows) => {
          //     //   this.listQuery.status=optionVal
          //   },
          // },
          // {
          //   type: "associate",
          //   label: "需求成员",
          //   prop: "genDemandUsers",
          //   // width: "200px",
          //   examine: true,
          //   valueProp: "name",
          //   labelProp: "name",
          //   displayInit: "name",
          //   columns: projectRolesColumns,
          //   mulitiple: true,
          //   clearable: true,
          //   queryMethod: projectRolesQueryMethod,
          //   changeSelect: (value, selectedRows) => {
          //     //   this.listQuery.status=optionVal
          //   },
          // },

          {
            type: 'datePicker',
            prop: 'planStartEndDate',
            label: '计划起止日期',
            col: 16,
            // labelWidth:'100px',
            // width: "200px",
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            subType: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            clearable: false,
            changeDate: (date) => {
              debugger;
              this.temp.planStartTime = date[0];
              this.temp.planEndTime = date[1];
            }
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
            label: '项目名称',
            prop: 'projectName',
            width: '200px',
            clearable: false,
            placeholder: '请输入项目名称',
            col: 8
          },
          // {
          //   type: "associate",
          //   label: "项目经理",
          //   prop: "dutyName",
          //   width: "200px",
          //   valueProp: "name",
          //   labelProp: "name",
          //   displayInit: "name",
          //   columns: projectRolesColumns,
          //   mulitiple: true,
          //   clearable: true,
          //   queryMethod: projectRolesQueryMethod,
          //   changeSelect: (value, selectedRows) => {
          //     //   this.listQuery.status=optionVal
          //   },
          // },
          {
            type: 'select',
            label: '项目状态',
            prop: 'status',
            col: 8,
            width: '200px',
            optionLabel: 'display_name',
            optionValue: 'key',
            optionKey: 'key',
            options: projectStatusOptions,
            changeSelect: (optionVal) => {
              this.listQuery.status = optionVal;
            }
          },
          {
            type: 'input',
            label: '项目客户',
            prop: 'customer',
            col: 8,
            width: '200px',
            clearable: false,
            placeholder: '请输入客户名称'
          }
        ],
        operates: [
          {
            type: 'primary',
            buttonLabel: '新增项目',
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
          prop: 'projectName',
          label: '项目名称',
          align: 'center'
        },
        {
          prop: 'customer',
          label: '客户名称'
        },
        {
          prop: 'fcy',
          label: '项目金额'
        },
        {
          prop: 'dutyName',
          label: '项目经理'
          // width: "110",
        },
        {
          prop: 'planStartTime',
          label: '计划开始时间'
          // width: "110",
        },
        {
          prop: 'planEndTime',
          label: '计划结束时间'
          // width: "110",
        },
        {
          prop: 'actualStartTime',
          label: '实际开始时间'
          // width: "110",
        },
        {
          prop: 'actualEndTime',
          label: '实际结束时间'
          // width: "110",
        },

        {
          prop: 'status',
          label: '状态',
          align: 'center',
          // width: "100",
          formatter: (row) => {
            return this.getProjectStatus(row);
          }
        }
      ], // 需要展示的列
      operates: {
        list: [
          {
            id: '1',
            label: '查看项目成员',
            type: 'text',
            show: true,
            disabled: false,
            method: (row) => {
              this.handleExamine(row);
            }
          },
          {
            id: '2',
            label: '编辑',
            type: 'text',
            show: true,
            disabled: false,
            method: (row) => {
              this.handleUpdate(row);
            }
          },
          {
            id: '3',
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
      total: 0,
      listLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        totalRecord: 0,
        projectName: '',
        dutyName: '',
        status: '',
        customer: ''
      },
      projectStatusOptions,
      projectRolesColumns,
      temp: {
        projectName: '',
        customer: '',
        fcy: '',
        status: '',
        chiefName: '',
        dutyName: '',
        devDirectorName: '',
        demandName: '',
        genDevUsers: '',
        genDemandUsers: '',
        planStartEndDate: [],
        planStartTime: '',
        planEndTime: '',
        actualStartTime: '',
        actualEndTime: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑项目信息',
        create: '新增项目'
      },
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'change' }
        ],
        customer: [
          { required: true, message: '请输入客户名称', trigger: 'change' }
        ],
        fcy: [{ required: true, message: '请输入项目金额', trigger: 'change' }],
        status: [
          { required: true, message: '请选择项目状态', trigger: 'change' }
        ],
        dutyName: [
          { required: true, message: '请选择项目经理', trigger: 'change' }
        ],
        genDevUsers: [
          { required: true, message: '请选择开发人员', trigger: 'change' }
        ],
        genDemandUsers: [
          { required: true, message: '请选择需求人员', trigger: 'change' }
        ],
        planStartEndDate: [
          { required: true, message: '请选择计划起止日期', trigger: 'change' }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
    // this.initPostSelect();
  },
  methods: {
    getProjectStatus(row) {
      if (row) {
        const find = projectStatusOptions.find((item) => {
          return item.key === row.status;
        });
        return find.display_name;
      }
      return '未知';
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
      queryUemProject(this.listQuery)
        .then((response) => {
          this.list = response.data.records;
          this.list.forEach((item, index) => {
            item.count =
              (this.listQuery.currentPage - 1) * this.listQuery.pageSize +
              index +
              1;
            item.planStartEndDate = [item.planStartTime, item.planEndTime];
          });

          this.totalRecord = response.data.totalRecord;
          this.listQuery.totalRecord = response.data.totalRecord;
          // Just to simulate the time of the request
          this.listLoading = false;
        })
        .catch(() => {
          debugger;
        });
    },

    resetListQuery() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        totalRecord: 0,
        projectName: '',
        dutyName: '',
        status: '',
        customer: ''
      };
      this.getList();
    },
    handleExamine(row) {
      this.dialogStatus = 'examine';
      this.$refs['examineDialog'].open(row);
    },
    handleAdd() {
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['formPanel'].$refs['dataForm'].clearValidate();
      });
    },
    handleUpdate(row) {
      debugger
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
          addUemProject(this.temp)
            .then(() => {
              debugger;
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
              this.dialogButtonLoading = false;
              this.handleResetForm();
              this.dialogFormVisible = false;
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
      debugger;
      this.$refs['formPanel'].$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogButtonLoading = true;
          const tempData = Object.assign({}, this.temp);
          debugger;
          updateUemProject(tempData)
            .then(() => {
              this.$message({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              });
              this.handleResetForm();
              this.dialogButtonLoading = false;
              this.dialogFormVisible = false;
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
      debugger;
      this.$confirm(
        '您确定要删除该项目信息吗?删除后该项目信息不可恢复。',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const _this = this;
          deleteSysPost(row.uemProjectById)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              _this.getList();
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
        projectName: '',
        customer: '',
        fcy: '',
        status: '',
        chiefName: '',
        dutyName: '',
        devDirectorName: '',
        demandName: '',
        genDevUsers: '',
        genDemandUsers: '',
        planStartEndDate: [],
        planStartTime: '',
        planEndTime: '',
        actualStartTime: '',
        actualEndTime: ''
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
