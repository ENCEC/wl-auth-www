<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 10:36:16
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-27 13:57:35
 * @Description: 系统管理-用户管理
-->

<template>
  <div class="app-container user-manage">
    <el-form ref="filterFormRef" :model="filterForm" :inline="true" size="medium">
      <el-form-item label="用户名" prop="account">
        <el-input
          v-model="filterForm.account"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="filterForm.name"
          placeholder="请输入姓名"
          clearable
        />
      </el-form-item>
      <el-form-item label="状态" prop="isValid">
        <el-select
          v-model="filterForm.isValid"
          placeholder="请选择状态"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="btn-wrap">
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            @click="handleOpen"
          >新增用户</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            @click="handleQuery"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            :plain="true"
            @click="resetQueryForm('filterFormRef')"
          >重置</el-button>
        </el-form-item>
      </div>
    </el-form>
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
      <el-table-column prop="isValid" label="是否禁用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isValid"
            active-color="#13ce66"
            @change="changeStatus(scope.row)"
          />
          <!-- {{ scope.row.isValid === VALID_STATUS.ON ? "启用" : "禁用" }} -->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <span @click="handleOpen(scope.row)">编辑</span>
            <span @click="resetPassword(scope.row.uemUserId)">重置密码</span>
            <span @click="handleDelete(scope.row.uemUserId)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 End -->
    <!-- 分页 -->
    <el-pagination
      class="pagination-wrap"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
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
        密码重置成功！重置后的密码为<span class="password">123456</span> 。
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
    CreateDialog
  },
  mixins: [tableMix],
  data() {
    return {
      editData: {},
      options: [
        {
          value: true,
          label: '启用'
        },
        {
          value: false,
          label: '禁用'
        }
      ],
      show: false,
      dialogVisible: false,
      filterForm: {
        account: '',
        name: '',
        isValid: ''
      },
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
    console.log('【 this.$dictionary 】-157', this.$dictionary);
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
    handleOpen(item = null) {
      this.dialogVisible = true;
      this.editData = { uemUserId: item.uemUserId } || {}
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
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
  }
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
