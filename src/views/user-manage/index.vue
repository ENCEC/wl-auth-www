<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 10:36:16
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-28 15:23:33
 * @Description: 系统管理-用户管理
-->

<template>
  <div class="app-container user-manage">
    <!-- 查询组件 -->
    <filter-panel :filter-config="filterConfig" :value="filterForm" />
    <!-- 表格 Start -->
    <el-table
      highlight-current-row
      :data="records"
      height="350px"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" />
      <el-table-column prop="account" label="用户名" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="mobile" label="联系电话" />
      <el-table-column prop="email" label="电子邮箱" />
      <el-table-column prop="isValid" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isValid"
            active-color="#0050AC"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <el-button type="text" @click="handleOpen(scope.row)">编辑</el-button>
            <el-button type="text" @click="resetPassword(scope.row.uemUserId)">重置密码</el-button>
            <el-button type="text" @click="handleDelete(scope.row.uemUserId)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 End -->
    <!-- 分页 -->
    <el-pagination
      class="pagination-wrap"
      :current-page.sync="params.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 新增/修改用户 -->
    <CreateDialog :visible.sync="dialogVisible" :edit-data="editData" @getTableData="getTableData" />
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
import filterPanel from '@/components/FilterPanel'
import { filterConfig } from './config-data.js';
import CreateDialog from './component/create-dialog';
import {
  queryUemUser,
  resetUemUserPassword,
  uemUserStartStop,
  deleteUemUser
} from '@/api/user-manege';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'UserManage',
  components: {
    filterPanel, CreateDialog
  },
  mixins: [tableMix],
  data() {
    return {
      filterConfig: filterConfig(this),
      filterForm: {
        // page: 1,
        // size: 20,
        // total: 0,
        account: undefined,
        name: undefined,
        isValid: undefined
      },
      editData: {},
      show: false,
      dialogVisible: false,
      records: [],
      total: 0,
      VALID_STATUS: {
        ON: true,
        OFF: false
      }
    };
  },
  computed: {},
  created() {
    this.getTableData();
  },
  mounted() {
    // console.log('【 this.$dictionary 】-157', this.$dictionary);
  },
  methods: {
    // 获取表格数据
    getTableData() {
      queryUemUser({
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
    handleOpen(item = {}) {
      this.dialogVisible = true;
      this.editData = { uemUserId: item.uemUserId || '' }
    },
    // 重置密码
    resetPassword(uemUserId) {
      this.$confirm(
        '您确定要重置密码吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        resetUemUserPassword({ uemUserId }).then(res => {
          this.show = true;
        });
      });
    },
    // 启用/禁用用户
    changeStatus(item) {
      const uemUserId = item.uemUserId
      const isValid = item.isValid
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
          this.getTableData()
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
