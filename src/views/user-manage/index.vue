<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 10:36:16
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 12:32:45
 * @Description: 系统管理-用户管理
-->

<template>
  <div class="app-container user-manage">
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
    <!-- 新增/修改用户 -->
    <CreateDialog
      :visible.sync="dialogVisible"
      :edit-data="editData"
      @getTableData="getTableData"
    />
    <!-- 密码重置 Start -->
    <el-dialog center title="消息提示" :visible.sync="show" width="30%">
      <div class="password-dialog">
        密码重置成功！已发送至您的邮箱，请注意查收。
        <!-- 重置后的密码为<span class="password">123456</span> 。 -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          @click="show = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 密码重置 End -->
  </div>
</template>
<script>
import filterPanel from '@/components/FilterPanel';
import tableComponent from '@/components/TableComponent';
import { filterConfig, tableConfig, columns, operates } from './config-data.js';
import CreateDialog from './component/create-dialog';
import {
  queryUemUser,
  resetUemUserPassword,
  uemUserStartStop,
  deleteUemUser
} from '@/api/user-manage';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'UserManage',
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
        account: undefined,
        name: undefined,
        isValid: undefined
      },
      // 表格
      records: [],
      listLoading: false,
      tableConfig,
      columns: columns(this),
      operates: operates(this),
      // 弹框
      editData: {},
      show: false,
      dialogVisible: false
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
      this.listLoading = true;
      queryUemUser({
        pageNo: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then(res => {
        this.records = res.data.records;
        this.params.totalRecord = res.data.totalRecord;
        this.listLoading = false;
      });
    },
    // 关闭弹框
    handleClose() {
      this.dialogVisible = false;
    },
    // 打开弹框
    handleOpen(item = {}) {
      this.dialogVisible = true;
      this.editData = { uemUserId: item.uemUserId || '' };
    },
    // 重置密码
    resetPassword(uemUserId) {
      this.$confirm('您确定要重置密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetUemUserPassword({ uemUserId }).then(res => {
          this.show = true;
        });
      });
    },
    // 启用/禁用用户
    changeStatus(item) {
      const uemUserId = item.uemUserId;
      const isValid = item.isValid;
      uemUserStartStop({ uemUserId, isValid }).then(res => {
        this.$message.success('操作成功');
      });
    },
    // 删除用户信息
    handleDelete(uemUserId) {
      this.$confirm(
        '您确定要删除该用户吗？删除后该用户信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteUemUser({ uemUserId }).then(res => {
          this.$message.success('操作成功');
          this.getTableData();
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-manage {
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
  // 重置密码
  .password-dialog {
    height: 55px;
    text-align: center;
    .password {
      color: rgb(194, 22, 22);
    }
  }
}
</style>
