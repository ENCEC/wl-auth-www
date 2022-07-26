<!--
 * @Author: Hongzf
 * @Date: 2022-07-26 14:43:35
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-26 16:11:41
 * @Description:
-->
<template>
  <div class="app-container menu-manage">
    <el-form ref="filterFormRef" :model="filterForm" :inline="true" size="mini">
      <el-form-item label="菜单标题" prop="resourceTitle">
        <el-input
          v-model="filterForm.resourceTitle"
          placeholder="请输入菜单标题"
          clearable
        />
      </el-form-item>
      <el-form-item label="父级菜单" prop="resourcePid">
        <el-select
          v-model="filterForm.resourcePid"
          placeholder="请选择父级菜单"
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
            size="mini"
            @click="handleOpen"
          >新增菜单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="handleQuery"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="resetQueryForm('filterFormRef')">重置</el-button>
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
      <el-table-column prop="resourceTitle" label="菜单标题" />
      <el-table-column prop="resourcePid" label="父级菜单" />
      <el-table-column prop="resourceUrl" label="资源地址" />
      <el-table-column prop="resourceSort" label="菜单序号" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="isValid" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isValid"
            active-color="#13ce66"
            @change="changeStatus"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="operate-wrap">
            <span @click="handleOpen(scope.row.id)">编辑</span>
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
    <CreateDialog :visible.sync="dialogVisible" />
  </div>
</template>
<script>
import CreateDialog from './component/create-dialog';
import { queryResourceByPage, deleteResourceById, updateResourceStatus } from '@/api/menu-manege';
import tableMix from '@/mixins/table-mixin';
export default {
  name: 'MenuManage',
  components: {
    CreateDialog
  },
  mixins: [tableMix],
  data() {
    return {
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
      dialogVisible: false,
      filterForm: {
        resourceTitle: 'ss',
        resourcePid: ''
        // isValid: false
      },
      records: [{}],
      total: 0
    };
  },
  computed: {},
  created() {
    this.getTableData();
  },
  methods: {
    // 获取表格数据
    getTableData() {
      queryResourceByPage({
        currentPage: this.params.currentPage,
        pageSize: this.params.pageSize,
        ...this.filterForm
      }).then(res => {
        console.log('【 res 】-158', res)
        this.records = res.data.records;
        this.total = res.data.total;
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleOpen() {
      this.dialogVisible = true;
    },
    // 启用禁用
    changeStatus(isValid) {
      updateResourceStatus({ isValid }).then(res => {
        console.log('【 res 】-200', res);
        this.$message.success('操作成功');
      });
      console.log('【 isValid 】-178', isValid);
    },
    // 删除
    handleDelete(sysResourceId) {
      console.log('【 id 】-178', sysResourceId);
      this.$confirm(
        '您确定要删除该菜单信息吗？删除后该菜单信息不可恢复。',
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        deleteResourceById({ sysResourceId }).then(res => {
          this.$message.success('操作成功');
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-manage {
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
}
</style>
