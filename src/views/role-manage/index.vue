<!--
 * @Author: Hongzf
 * @Date: 2022-07-27 17:05:05
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-12 09:43:19
 * @Description:系统管理-角色管理
-->

<template>
  <div class="app-container role-manage">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="filterForm" />
    <!-- 表格 Start -->
    <el-table
      highlight-current-row
      :data="records"
      height="380px"
      style="width: 100%"
      border
    >
      <el-table-column type="index" label="序号" width="80px" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="remark" label="角色描述" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="isValid" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isValid"
            active-color="#0050AC"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <el-button
              type="text"
              @click="handleOpen(scope.row, 'edit')"
            >编辑</el-button>
            <el-button
              type="text"
              @click="handleOpen(scope.row, 'detail')"
            >查看</el-button>
            <el-button
              type="text"
              @click="handleDelete(scope.row.sysRoleId)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 End -->
    <!-- 分页 -->
    <el-pagination
      class="pagination-wrap"
      :current-page.sync="params.currentPage"
      :page-size="params.pageSize"
      :page-sizes="[10, 20, 50]"
      prev-text="上一页"
      next-text="下一页"
      style="margin-top: 15px;text-align: center"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
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
import { filterConfig } from './config-data.js';
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
    CreateDialog
  },
  mixins: [tableMix],
  data() {
    return {
      filterConfig: filterConfig(this),
      filterForm: {
        roleName: '',
        isValid: ''
      },
      editData: {},
      show: false,
      dialogVisible: false,
      records: [],
      total: 0,
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
        this.total = res.data.totalRecord;
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
      this.editData = { sysRoleId: item.sysRoleId || '' };
    },
    // 启用/禁用用户
    changeStatus(item) {
      const sysRoleId = item.sysRoleId;
      const isValid = item.isValid;
      updateRoleStatus({ sysRoleId, isValid }).then(res => {
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
        deleteRole({ sysRoleId }).then(res => {
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
