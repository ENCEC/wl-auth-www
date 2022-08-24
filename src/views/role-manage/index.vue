<!--
 * @Author: Hongzf
 * @Date: 2022-07-27 17:05:05
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-24 11:27:30
 * @Description:系统管理-角色管理
-->

<template>
  <div class="app-container role-manage">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="filterForm" />
    <!-- 表格 Start -->
    <table-component
      :data="records"
      :options="tableConfig"
      :pagination="params"
      :columns="columns"
      :operates="operates"
      :list-loading="listLoading"
      @handleIndexChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
    <!-- 表格 End -->
    <!-- 新增/修改弹框 -->
    <CreateDialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :edit-data="editData"
      :type="openType"
      @getTableData="getTableData"
    />
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel';
import tableComponent from '@/components/TableComponent';
import { filterConfig, tableConfig, columns, operates } from './config-data.js';
import CreateDialog from './component/create-dialog';
import {
  queryRoleByPage,
  updateRoleStatus,
  deleteRole
} from '@/api/role-manage';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'RoleManage',
  components: {
    filterPanel,
    tableComponent,
    CreateDialog
  },
  mixins: [tableMix],
  data() {
    return {
      // 查询
      filterConfig: filterConfig(this),
      filterForm: {
        roleName: '',
        isValid: ''
      },
      // 表格
      records: [],
      listLoading: false,
      tableConfig,
      columns: columns(this),
      operates: operates(this),
      // 弹框
      editData: {},
      dialogVisible: false,
      openType: ''
    };
  },
  computed: {},
  created() {
    this.getTableData();
  },
  mounted() {},
  methods: {
    // 获取表格数据
    getTableData() {
      queryRoleByPage({
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then(res => {
        this.records = res.data.records;
        this.params.totalRecord = res.data.totalRecord;
      });
    },
    // 关闭弹框
    handleClose() {
      this.dialogVisible = false;
    },
    // 打开弹框
    handleOpen(item = {}, type = '') {
      this.dialogVisible = true;
      this.openType = type;
      this.editData = item || {} // { sysRoleId: item.sysRoleId || '' };
    },
    // 启用/禁用用户
    changeStatus(item) {
      const sysRoleId = item.sysRoleId;
      const isValid = item.isValid;
      updateRoleStatus({ sysRoleId, isValid }).then(() => {
        this.$message.success('操作成功');
      });
    },
    // 删除用户信息
    handleDelete(sysRoleId) {
      this.$confirm(
        '您确定要删除该角色信息吗？删除后该角色信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteRole({ sysRoleId }).then(() => {
          this.$message.success('操作成功');
          this.getTableData();
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.role-manage {
  // 操作栏
  .operate-wrap {
    span {
      display: inline-block;
      cursor: pointer;
    }
  }
  // 分页
  .pagination-wrap {
    margin: 10px;
    float: right;
  }
}
</style>
