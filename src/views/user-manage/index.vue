<!--
 * @Author: Hongzf
 * @Date: 2022-07-25 10:36:16
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-25 19:01:57
 * @Description: 系统管理-用户管理
-->
<template>
  <div class="app-container user-manage">
    <el-form ref="filterFormRef" :model="filterForm" :inline="true" size="mini">
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
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="filterForm.status"
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
            size="mini"
            @click="handleOpen"
          >新增用户</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="handleQuery"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="resetQueryForm">重置</el-button>
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
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="联系电话" />
      <el-table-column prop="email" label="电子邮箱" />
      <el-table-column prop="teacherGender" label="状态">
        <template slot-scope="scope">
          {{ scope.row.teacherGender === 1 ? "启用" : "禁用" }}
        </template>
      </el-table-column>
      <el-table-column prop="teacherGender" label="操作">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <span @click="handleOpen(scope.row.id)">编辑</span>
            <span @click="resetPassword(scope.row.id)">重置密码</span>
            <span @click="changeStatus(1)">启用</span>
            <span @click="changeStatus(2)">禁用</span>
            <span @click="handleDelete(scope.row.id)">删除</span>
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
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 新增/修改用户 -->
    <CreateDialog :visible.sync="dialogShow" />
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
import { queryUemUser } from '@/api/user-manege';

export default {
  name: 'UserManage',
  components: {
    CreateDialog
  },
  data() {
    return {
      options: [
        {
          value: '1',
          label: '启用'
        },
        {
          value: '2',
          label: '禁用'
        }
      ],
      show: false,
      dialogShow: false,
      filterForm: {
        account: '',
        name: '',
        status: '',
        currentPage: 1,
        pageSize: 10
      },
      records: [{}],
      total: 100,
      currentRow: ''
    };
  },
  computed: {},
  created() {
    this.getTableData();
  },
  methods: {
    // 获取表格数据
    getTableData() {
      queryUemUser(this.filterForm).then(res => {
        this.records = res.data.records;
        this.total = res.data.total;
      });
    },
    // 重置
    resetQueryForm() {
      this.$refs.filterFormRef.resetFields();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.query();
    },
    handleClose() {
      this.dialogShow = false;
    },
    handleOpen() {
      this.dialogShow = true;
    },
    // 查询
    handleQuery() {
      console.log('【 查询 】-160');
    },
    // 重置密码
    resetPassword() {
      this.show = true;
    },
    // 启用禁用
    changeStatus(status) {
      console.log('【 status 】-178', status);
    },
    // 删除
    handleDelete(id) {
      console.log('【 id 】-178', id);
      this.$confirm(
        '您确定要删除该用户吗？删除后该用户信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {})
        .catch(() => {});
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
