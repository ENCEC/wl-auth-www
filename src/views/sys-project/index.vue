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
          >提交</el-button
        >
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
    />
  </div>
</template>

<script>
import { querySysPost } from "@/api/sys-post.js";
import {
  queryByTechnicalTitleName,
  updateStatus,
  saveSysTechnicalTitle,
  updateSysTechnicalTitle,
  deleteSysTechnicalTitle,
} from "@/api/sys-technical-title.js";
import { parseTime } from "@/utils";
import tableComponent from "@/components/TableComponent";
import filterPanel from "@/components/FilterPanel";
import formPanel from "@/components/FormPanel";
const projectStatusOptions = [
  { key: 0, display_name: "未开始" },
  { key: 0, display_name: "进行中" },
  { key: 0, display_name: "暂停中" },
  { key: 0, display_name: "已完成" },
  { key: 0, display_name: "延期" },
  { key: 0, display_name: "终止" },
];
const projectRolesColumns = [
  {
    title: "姓名",
    field: "cname",
  },
];

export default {
  name: "SysProject",
  components: { tableComponent, filterPanel, formPanel },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      formConfig: {
        inline: false,
        col: 12,
        labelPosition: "right",
        ref: "dataForm",
        labelWidth: "100px",
        style: "width: 100%;",
        formItemList: [
          {
            type: "input",
            prop: "projectName",
            // width: "200px",
            label: "项目名称",
            placeholder: "请输入职称名称",
          },
          {
            type: "input",
            prop: "customer",
            // width: "200px",
            label: "客户名称",
            placeholder: "请输入客户名称",
          },
          {
            type: "input",
            prop: "fcy",
            // width: "200px",
            label: "项目金额",
            placeholder: "请输入项目金额",
          },

          {
            type: "select",
            class: "filter-item",
            prop: "status",
            // width: "200px",

            label: "项目状态",
            placeholder: "请选择项目状态",
            optionLabel: "display_name",
            optionValue: "key",
            optionKey: "key",
            options: projectStatusOptions,
          },

          {
            type: "associate",
            label: "项目总监",
            prop: "chiefName",
            // width: "200px",
            valueProp: "name",
            labelProp: "name",
            displayInit: "name",
            columns: projectRolesColumns,
            mulitiple: true,
            clearable: true,
            queryMethod: this.projectRolesQueryMethod,
            changeSelect: (value, selectedRows) => {
              //   this.listQuery.status=optionVal
            },
          },
          {
            type: "associate",
            label: "项目经理",
            prop: "dutyName",
            // width: "200px",
            valueProp: "name",
            labelProp: "name",
            displayInit: "name",
            columns: projectRolesColumns,
            mulitiple: true,
            clearable: true,
            queryMethod: this.projectRolesQueryMethod,
            changeSelect: (value, selectedRows) => {
              //   this.listQuery.status=optionVal
            },
          },
          {
            type: "associate",
            label: "开发经理",
            prop: "devDirectorName",
            // width: "200px",
            valueProp: "name",
            labelProp: "name",
            displayInit: "name",
            columns: projectRolesColumns,
            mulitiple: true,
            clearable: true,
            queryMethod: this.projectRolesQueryMethod,
            changeSelect: (value, selectedRows) => {
              //   this.listQuery.status=optionVal
            },
          },
          {
            type: "associate",
            label: "需求组长",
            prop: "demandName",
            // width: "200px",
            valueProp: "name",
            labelProp: "name",
            displayInit: "name",
            columns: projectRolesColumns,
            mulitiple: true,
            clearable: true,
            queryMethod: this.projectRolesQueryMethod,
            changeSelect: (value, selectedRows) => {
              //   this.listQuery.status=optionVal
            },
          },
          {
            type: "associate",
            label: "开发成员",
            prop: "genDevUsers",
            // width: "200px",
            valueProp: "name",
            labelProp: "name",
            displayInit: "name",
            columns: projectRolesColumns,
            mulitiple: true,
            clearable: true,
            queryMethod: this.projectRolesQueryMethod,
            changeSelect: (value, selectedRows) => {
              //   this.listQuery.status=optionVal
            },
          },
          {
            type: "associate",
            label: "需求成员",
            prop: "genDemandUsers",
            // width: "200px",
            valueProp: "name",
            labelProp: "name",
            displayInit: "name",
            columns: projectRolesColumns,
            mulitiple: true,
            clearable: true,
            queryMethod: this.projectRolesQueryMethod,
            changeSelect: (value, selectedRows) => {
              //   this.listQuery.status=optionVal
            },
          },

          {
            type: "dateTimePicker",
            prop: "planStartEndDate",
            label: "计划起止日期",
            // labelWidth:'100px',
            // width: "200px",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            subType: "daterange",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            clearable: false,
          },
        ],
      },

      filterConfig: {
        inline: false,
        gutter: 5, // 栅格的间隔
        col: 6, // 栅格的格数
        operateCol: 24,
        labelWidth: "80px",
        labelPosition: "left",
        filterList: [
          {
            type: "input",
            label: "项目名称",
            prop: "projectName",
            width: "200px",
            clearable: false,
            placeholder: "请输入项目名称",
            col: 8,
          },

          {
            type: "associate",
            label: "项目经理",
            prop: "dutyName",
            // width: "200px",
            valueProp: "name",
            labelProp: "name",
            displayInit: "name",
            columns: projectRolesColumns,
            mulitiple: true,
            clearable: true,
            queryMethod: this.projectRolesQueryMethod,
            changeSelect: (value, selectedRows) => {
              //   this.listQuery.status=optionVal
            },
          },
          {
            type: "select",
            label: "项目状态",
            prop: "status",
            col: 8,
            width: "200px",
            optionLabel: "display_name",
            optionValue: "key",
            optionKey: "key",
            options: projectStatusOptions,
            changeSelect: (optionVal, item, index) => {
              this.listQuery.status = optionVal;
            },
          },
          {
            type: "input",
            label: "项目客户",
            prop: "customer",
            col: 8,
            width: "200px",
            clearable: false,
            placeholder: "请输入客户名称",
          },
        ],
        operates: [
          {
            type: "primary",
            buttonLabel: "新增项目",
            btnType: "primary",
            //   icon: 'el-icon-search',
            method: (item, index) => {
              this.handleAdd();
            },
          },
          {
            type: "primary",
            buttonLabel: "查询",
            btnType: "primary",
            //   icon: 'el-icon-edit',
            method: (item, index) => {
              this.getList();
            },
          },
          {
            type: "primary",
            buttonLabel: "重置",
            btnType: "primary",
            plain: true,
            //   icon: 'el-icon-download',
            method: (item, index) => {
              this.resetListQuery();
            },
          },
        ],
      },
      tableData: [],
      options: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        pagination: true,
      }, // table 的参数

      columns: [
        {
          prop: "count",
          label: "序号",
          align: "center",
          width: "80",
        },
        {
          prop: "technicalName",
          label: "项目名称",
          align: "center",
          width: "150",
        },
        {
          prop: "postName",
          label: "客户名称",
        },
        {
          prop: "seniority",
          label: "项目金额",
        },
        {
          prop: "createBy",
          label: "项目经理",
          width: "110",
        },
        {
          prop: "createTime",
          label: "计划开始时间",
          width: "110",
        },
        {
          prop: "createTime",
          label: "计划结束时间",
          width: "110",
        },
        {
          prop: "createTime",
          label: "实际开始时间",
          width: "110",
        },
        {
          prop: "createTime",
          label: "实际结束时间",
          width: "110",
        },

        {
          prop: "status",
          label: "状态",
          align: "center",
          width: "100",
          formatter: (row, column, cellValue) => {
            return getProjectStatus(row);
          },
        },
      ], // 需要展示的列
      operates: {
        list: [
          {
            id: "1",
            label: "编辑",
            type: "text",
            show: true,
            disabled: false,
            method: (index, row) => {
              this.handleUpdate(row);
            },
          },
          {
            id: "2",
            label: "删除",
            type: "text",
            show: true,
            plain: false,
            method: (index, row) => {
              this.handleDelete(row);
            },
          },
        ],
        fixed: false,
        width: 230,
      }, // 列操作按钮

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        totalRecord: 0,
        projectName: "",
        dutyName: "",
        status: "",
        customer: "",
      },
      projectStatusOptions,
      projectRolesColumns,
      temp: {
        projectName: "",
        customer: "",
        fcy: "",
        status: "",
        chiefName: "",
        dutyName: "",
        devDirectorName: "",
        demandName: "",
        genDevUsers: "",
        genDemandUsers: "",
        planStartEndDate: "",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑职称",
        create: "新增职称",
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "change" },
        ],
        customer: [
          { required: true, message: "请输入客户名称", trigger: "change" },
        ],
        fcy: [
          { required: true, message: "请输入项目金额", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择项目状态", trigger: "change" },
        ],
        dutyName: [
          { required: true, message: "请选择项目经理", trigger: "change" },
        ],
        genDevUsers: [
          { required: true, message: "请选择开发人员", trigger: "change" },
        ],
        genDemandUsers: [
          { required: true, message: "请选择需求人员", trigger: "change" },
        ],
        planStartEndDate: [
          { required: true, message: "请选择计划起止日期", trigger: "change" },
        ],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
    this.initPostSelect();
  },
  methods: {
    getProjectStatus(row) {
      if (row && row.status) {
        const find = projectStatusOptions.find((item) => {
          return item.status === row.status;
        });
        return find.display_name;
      }
    },
    initPostSelect() {
      const params = {
        pageSize: 1000,
        currentPage: 1,
        status: "0",
      };
      querySysPost(params)
        .then((res) => {
          res.data.records
            .filter((item) => {
              return item.status === "0";
            })
            .forEach((item) => {
              this.postTypeOptions.push({
                key: item.postName,
                display_name: item.postName,
              });
            });
        })
        .catch((err) => {
          this.$message.error("初始化岗位失败");
        });
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
          item.count =
            (this.listQuery.currentPage - 1) * this.listQuery.pageSize +
            index +
            1;
          item.status = item.status === "0" ? true : false;
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
        technicalName: "",
        postName: "",
        status: "",
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
    handleModifyStatus(row, status) {
      const params = Object.assign({}, row, { status: row.status ? "0" : "1" });
      debugger;
      updateStatus(params)
        .then((res) => {
          this.$message({
            message: "操作成功",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message({
            message: "操作失败",
            type: "error",
          });
        });
    },
    handleAdd() {
      // this.temp = Object.assign({}, row); // copy obj
      // this.temp.createTime = parseTime(new Date());
      console.log(this.temp.createTime);
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["formPanel"].$refs["dataForm"].clearValidate();
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      debugger;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["formPanel"].$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["formPanel"].$refs["dataForm"].validate((valid) => {
        if (valid) {
          //   this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          //   this.temp.author = 'vue-element-admin'
          saveSysTechnicalTitle(this.temp)
            .then((res) => {
              debugger;
              // this.list.unshift(this.temp);
              this.dialogFormVisible = false;
              this.$message({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000,
              });
              this.getList();
            })
            .catch((err) => {
              this.$message({
                title: "失败",
                message: "创建失败",
                type: "error",
                duration: 2000,
              });
            });
        }
      });
    },
    updateData() {
      debugger;
      this.$refs["formPanel"].$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp, {
            status: this.temp.status ? "0" : "1",
          });
          debugger;
          updateSysTechnicalTitle(tempData)
            .then(() => {
              this.dialogFormVisible = false;
              this.$message({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000,
              });
              this.getList();
            })
            .catch((err) => {
              debugger;
              this.$message({
                title: "失败",
                message: "修改失败",
                type: "error",
                duration: 2000,
              });
            });
        }
      });
    },
    handleDelete(row) {
      debugger;
      this.$confirm(
        "您确定要删除该职称信息吗?删除后该职称信息不可恢复",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const _this = this;
          deleteSysTechnicalTitle(row.technicalTitleId)
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              _this.getList();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleResetForm() {
      this.temp = {
        projectName: "",
        customer: "",
        fcy: "",
        status: "",
        chiefName: "",
        dutyName: "",
        devDirectorName: "",
        demandName: "",
        genDevUsers: "",
        genDemandUsers: "",
        planStartEndDate: "",
      };
    },
    handleDialogClose() {
      // this.handleResetForm();
      this.$refs["formPanel"].$refs["dataForm"].clearValidate();
    },
    projectRolesQueryMethod({ keyword, pageSize, currentPage }) {
      return request({
        url: "/demo/users",
        method: "get",
        params: {
          keyword,
          pageSize,
          currentPage,
        },
      });
    },
  },
};
</script>
<style lang="scss" scope>
.limitHeight .el-textarea__inner {
  height: 36px;
}
</style>
